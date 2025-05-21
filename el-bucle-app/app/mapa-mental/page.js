"use client";

import React, { useState, useRef, useEffect } from 'react';
import Footer from '../../components/Footer';

const MapaMentalPage = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const containerRef = useRef(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [containerHeight, setContainerHeight] = useState('calc(100vh - 300px)');
  
  // Efecto para cargar datos del localStorage al iniciar
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      try {
        const savedCharacter = localStorage.getItem('autosave_character');
        
        if (savedCharacter) {
          const characterData = JSON.parse(savedCharacter);
          
          // Cargar nodos y conexiones si existen en el objeto del personaje
          if (characterData.mapaMentalNodes) {
            setNodes(characterData.mapaMentalNodes);
          }
          
          if (characterData.mapaMentalConnections) {
            setConnections(characterData.mapaMentalConnections);
          }
        }
      } catch (error) {
        console.error('Error al cargar el mapa mental:', error);
      }
    }
  }, []);
  
  // Efecto para guardar datos en localStorage cuando cambian
  useEffect(() => {
    // Solo ejecutar si hay nodos para guardar y estamos en el cliente
    if (typeof window !== 'undefined' && (nodes.length > 0 || connections.length > 0)) {
      try {
        // Obtener el objeto del personaje existente o crear uno nuevo
        let characterData = {};
        const savedCharacter = localStorage.getItem('autosave_character');
        
        if (savedCharacter) {
          characterData = JSON.parse(savedCharacter);
        }
        
        // Añadir los nodos y conexiones al objeto del personaje
        characterData.mapaMentalNodes = nodes;
        characterData.mapaMentalConnections = connections;
        
        // Guardar el objeto actualizado
        localStorage.setItem('autosave_character', JSON.stringify(characterData));
      } catch (error) {
        console.error('Error al guardar el mapa mental:', error);
      }
    }
  }, [nodes, connections]);
  
  // Función para limpiar el mapa mental
  const clearMapaMental = () => {
    if (confirm('¿Estás seguro de que quieres borrar todo el mapa mental?')) {
      setNodes([]);
      setConnections([]);
      
      // Actualizar el objeto del personaje para eliminar solo el mapa mental
      try {
        const savedCharacter = localStorage.getItem('autosave_character');
        
        if (savedCharacter) {
          const characterData = JSON.parse(savedCharacter);
          
          // Eliminar solo los datos del mapa mental
          delete characterData.mapaMentalNodes;
          delete characterData.mapaMentalConnections;
          
          // Guardar el objeto actualizado
          localStorage.setItem('autosave_character', JSON.stringify(characterData));
        }
      } catch (error) {
        console.error('Error al borrar el mapa mental:', error);
      }
    }
  };
  
  // Efecto para actualizar las dimensiones del contenedor cuando cambia el tamaño de la ventana
  useEffect(() => {
    const updateContainerDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };
    
    updateContainerDimensions();
    window.addEventListener('resize', updateContainerDimensions);
    return () => {
      window.removeEventListener('resize', updateContainerDimensions);
    };
  }, []);
  
  // Función para añadir un nuevo nodo al hacer clic
  const handleContainerClick = (e) => {
    // Solo crear nodo si se hace clic directamente en el contenedor, no en un nodo existente
    if (e.target === containerRef.current || e.target.classList.contains('mapa-mental-container')) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newNode = {
        id: Date.now(), // ID único basado en timestamp
        x,
        y,
        text: ''
      };
      
      setNodes([...nodes, newNode]);
    }
  };
  
  // Función para actualizar el texto de un nodo
  const updateNodeText = (id, text) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, text } : node
    ));
  };
  
  // Función para eliminar un nodo
  const deleteNode = (id) => {
    // Eliminar también todas las conexiones asociadas a este nodo
    setConnections(connections.filter(conn => 
      conn.parent !== id && conn.child !== id
    ));
    setNodes(nodes.filter(node => node.id !== id));
  };
  
  // Función para mantener los nodos dentro del contenedor durante el arrastre
  const keepNodeInContainer = (x, y) => {
    // Estimar el tamaño del nodo
    const nodeWidth = 150;
    const nodeHeight = 50;
    
    // Calcular los límites del contenedor
    const padding = 20; // Padding para evitar que el nodo toque el borde
    
    // Asegurar que el nodo permanezca dentro del contenedor horizontalmente
    // pero permitir crecimiento vertical
    const minX = padding + nodeWidth / 2;
    const maxX = containerDimensions.width - padding - nodeWidth / 2;
    const minY = padding + nodeHeight / 2;
    
    // No restringir el movimiento vertical hacia abajo
    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, y)
    };
  };
  
  // Función para añadir un nodo hijo
  const addChildNode = (parentId) => {
    const parentNode = nodes.find(node => node.id === parentId);
    if (!parentNode) return;
    
    // Encontrar una posición disponible para el nuevo nodo
    // Intentamos colocarlo a la derecha del nodo padre
    let newX = parentNode.x + 200;
    let newY = parentNode.y;
    
    // Verificar si la posición está ocupada por otro nodo
    let positionOccupied = true;
    let attempts = 0;
    const maxAttempts = 8;
    const radius = 300; // Aumentamos el radio para mayor separación
    
    while (positionOccupied && attempts < maxAttempts) {
      // Calcular nueva posición en un círculo alrededor del nodo padre
      const angle = (Math.PI * 2 * attempts) / maxAttempts;
      newX = parentNode.x + Math.cos(angle) * radius;
      newY = parentNode.y + Math.sin(angle) * radius;
      
      // Mantener el nodo dentro del contenedor
      const { x: constrainedX, y: constrainedY } = keepNodeInContainer(newX, newY);
      newX = constrainedX;
      newY = constrainedY;
      
      // Verificar si esta posición está lejos de TODOS los nodos, incluido el padre
      positionOccupied = nodes.some(node => {
        const distance = Math.sqrt(
          Math.pow(node.x - newX, 2) + Math.pow(node.y - newY, 2)
        );
        return distance < 120; // Distancia mínima entre nodos aumentada
      });
      
      attempts++;
    }
    
    // Si después de todos los intentos no encontramos posición, aumentamos el radio
    if (positionOccupied) {
      const extraRadius = 400;
      const randomAngle = Math.random() * Math.PI * 2;
      newX = parentNode.x + Math.cos(randomAngle) * extraRadius;
      newY = parentNode.y + Math.sin(randomAngle) * extraRadius;
      
      // Mantener el nodo dentro del contenedor
      const { x: constrainedX, y: constrainedY } = keepNodeInContainer(newX, newY);
      newX = constrainedX;
      newY = constrainedY;
    }
    
    // Crear el nuevo nodo
    const newNodeId = Date.now();
    const newNode = {
      id: newNodeId,
      x: newX,
      y: newY,
      text: ''
    };
    
    // Crear la conexión entre el nodo padre y el hijo
    const newConnection = {
      parent: parentId,
      child: newNodeId
    };
    
    setNodes([...nodes, newNode]);
    setConnections([...connections, newConnection]);
  };
  
  // Función para ajustar automáticamente el tamaño del textarea
  const adjustTextareaSize = (textarea) => {
    textarea.style.height = '1.5em';
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.width = 'auto';
    textarea.style.width = `${Math.max(150, textarea.scrollWidth)}px`;
  };
  
  // Función para ajustar el tamaño del contenedor según la posición de los nodos
  const adjustContainerSize = () => {
    if (!containerRef.current || nodes.length === 0) return;
    
    // Encontrar la posición Y más baja de todos los nodos
    const lowestY = Math.max(...nodes.map(node => node.y + 100)); // Añadir margen
    
    // Obtener la altura actual del contenedor
    const currentHeight = containerRef.current.clientHeight;
    
    // Si el nodo más bajo está cerca del fondo, aumentar la altura
    if (lowestY > currentHeight - 100) {
      const newHeight = Math.max(lowestY + 200, currentHeight);
      setContainerHeight(`${newHeight}px`);
    }
  };
  
  // Llamar a adjustContainerSize cuando cambian los nodos
  useEffect(() => {
    adjustContainerSize();
  }, [nodes]);
  
  // Funciones para el drag & drop
  const handleDragStart = (e, nodeId) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    // Calcular el offset para mantener la posición relativa del cursor
    const nodeElement = e.currentTarget;
    const rect = nodeElement.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDraggedNode(nodeId);
    setDragOffset({ x: offsetX, y: offsetY });
    
    // Añadir clase para estilo durante el arrastre
    nodeElement.classList.add('dragging');
  };
  
  const handleDragOver = (e) => {
    e.preventDefault(); 
    if (!draggedNode) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left - dragOffset.x;
    const y = e.clientY - containerRect.top - dragOffset.y;
    
    // Mantener el nodo dentro del contenedor
    const { x: constrainedX, y: constrainedY } = keepNodeInContainer(
      x + dragOffset.x, 
      y + dragOffset.y
    );
    
    // Actualizar la posición del nodo mientras se arrastra
    setNodes(nodes.map(node => 
      node.id === draggedNode 
        ? { ...node, x: constrainedX, y: constrainedY } 
        : node
    ));
    
    // Verificar si necesitamos aumentar el tamaño del contenedor
    if (constrainedY > containerRect.height - 100) {
      const newHeight = Math.max(constrainedY + 200, containerRect.height);
      setContainerHeight(`${newHeight}px`);
    }
  };
  
  const handleDragEnd = (e) => {
    e.stopPropagation();
    if (!draggedNode) return;
    
    // Quitar clase de estilo de arrastre
    const nodeElements = document.querySelectorAll('.node-container');
    nodeElements.forEach(el => el.classList.remove('dragging'));
    
    setDraggedNode(null);
  };
  
  // Función para calcular los puntos de conexión entre nodos
  const calculateConnectionPoints = (parent, child) => {
    // Calcular el centro de cada nodo
    const parentCenter = { x: parent.x, y: parent.y };
    const childCenter = { x: child.x, y: child.y };
    
    // Calcular el ángulo entre los nodos
    const angle = Math.atan2(childCenter.y - parentCenter.y, childCenter.x - parentCenter.x);
    
    // Estimar el tamaño del nodo (podría ser más preciso con refs)
    const nodeWidth = 150; // Ancho estimado
    const nodeHeight = 50; // Alto estimado
    
    // Calcular los puntos de borde según el ángulo
    let parentX, parentY, childX, childY;
    
    // Determinar si la conexión es más horizontal o vertical
    if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
      // Conexión más horizontal
      const parentOffsetX = (nodeWidth / 2) * Math.sign(Math.cos(angle));
      const childOffsetX = (nodeWidth / 2) * -Math.sign(Math.cos(angle));
      
      parentX = parentCenter.x + parentOffsetX;
      parentY = parentCenter.y + Math.tan(angle) * parentOffsetX;
      
      childX = childCenter.x + childOffsetX;
      childY = childCenter.y + Math.tan(angle) * childOffsetX;
    } else {
      // Conexión más vertical
      const parentOffsetY = (nodeHeight / 2) * Math.sign(Math.sin(angle));
      const childOffsetY = (nodeHeight / 2) * -Math.sign(Math.sin(angle));
      
      parentY = parentCenter.y + parentOffsetY;
      parentX = parentCenter.x + parentOffsetY / Math.tan(angle);
      
      childY = childCenter.y + childOffsetY;
      childX = childCenter.x + childOffsetY / Math.tan(angle);
    }
    
    return { parentX, parentY, childX, childY };
  };
  
  // Función para dibujar las líneas de conexión
  const renderConnections = () => {
    return connections.map((conn, index) => {
      const parentNode = nodes.find(node => node.id === conn.parent);
      const childNode = nodes.find(node => node.id === conn.child);
      
      if (!parentNode || !childNode) return null;
      
      const { parentX, parentY, childX, childY } = calculateConnectionPoints(parentNode, childNode);
      
      return (
        <line
          key={`conn-${index}`}
          x1={parentX}
          y1={parentY}
          x2={childX}
          y2={childY}
          stroke="#00f9ff"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
      );
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="main-content-area p-4 md:p-8 flex-grow text-white flex flex-col">
        <h1 className="main-title text-center">EL BUCLE <span className="subtitle"> Notas Mentales </span></h1>

        <div className="text-center mt-8 flex-grow flex flex-col">
          <div className="grid-container flex-grow">
            <div className="card lg:col-span-6 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-4">
                <p className="text-justify">Haz clic en cualquier punto para añadir una nota. Arrástrala para colocarla en un sitio mejor, o crea notas enlazadas si crees que eso va a salvar tu pescuezo.</p>
                <button 
                  onClick={clearMapaMental}
                  className="text-red-400 hover:text-red-300 text-sm ml-4 px-3 py-1"
                  style={{textShadow: '0 0 3px #f87171'}}
                >
                  Borrar todas las notas
                </button>
              </div>
              
              {/* Contenedor del mapa mental */}
              <div 
                ref={containerRef}
                className="mapa-mental-container relative border border-[#00f9ff] rounded-lg p-4 flex-grow bg-[#0a192f] overflow-auto"
                style={{ 
                  boxShadow: '0 0 15px rgba(0, 249, 255, 0.3)',
                  minHeight: 'calc(100vh - 300px)',
                  height: containerHeight
                }}
                onClick={handleContainerClick}
                onMouseMove={handleDragOver}
                onMouseUp={handleDragEnd}
              >
                {/* SVG para las líneas de conexión */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {renderConnections()}
                </svg>
                
                {nodes.map(node => (
                  <div
                    key={node.id}
                    className="absolute node-container cursor-move"
                    style={{ 
                      left: `${node.x}px`, 
                      top: `${node.y}px`,
                      transform: 'translate(-50%, -50%)',
                      transition: draggedNode === node.id ? 'none' : 'box-shadow 0.3s ease',
                    }}
                    onClick={(e) => e.stopPropagation()} // Evitar que el clic se propague al contenedor
                    onMouseDown={(e) => handleDragStart(e, node.id)}
                    onMouseUp={handleDragEnd}
                  >
                    <div className="flex items-start">
                      <textarea
                        value={node.text}
                        onChange={(e) => {
                          updateNodeText(node.id, e.target.value);
                          adjustTextareaSize(e.target);
                        }}
                        placeholder="Escribe aquí..."
                        className="transparent-textarea"
                        style={{ overflow: 'hidden' }}
                        onFocus={(e) => adjustTextareaSize(e.target)}
                        autoFocus={node.text === ''}
                        onMouseDown={(e) => e.stopPropagation()} // Evitar que el textarea inicie el drag
                      />
                      <div className="flex flex-col ml-1">
                        <button 
                          className="add-node-btn cursor-pointer mb-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            addChildNode(node.id);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <span className="text-[#34d399] hover:text-[#2dd4bd]" style={{textShadow: '0 0 3px #34d399'}}>+</span>
                        </button>
                        <button 
                          className="delete-node-btn cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNode(node.id);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <span className="text-[#ff4d4d] hover:text-[#ff0000]" style={{textShadow: '0 0 3px #ff4d4d'}}>−</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <a href="/" className="text-[#00f9ff] hover:underline" style={{textShadow: '0 0 3px #00f9ff'}}>
            ← Volver al inicio
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MapaMentalPage;