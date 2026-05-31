import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Keep track of current mouse position
  const mouseCoords = useRef({ x: 0, y: 0 });
  // Keep track of ring position (delayed lerping)
  const ringCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if it is a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    // Setup hover listeners for interactive elements
    const setupListeners = () => {
      const interactives = document.querySelectorAll('a, button, select, input, textarea, .project-card, [role="button"]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Smooth lerp loop for the cursor ring
    let animationFrameId;
    const updateRingPosition = () => {
      const rx = ringCoords.current.x;
      const ry = ringCoords.current.y;
      const cx = mouseCoords.current.x;
      const cy = mouseCoords.current.y;

      // Lerp coefficient: 0.12 means ring catches up by 12% each frame
      const nextX = rx + (cx - rx) * 0.12;
      const nextY = ry + (cy - ry) * 0.12;

      ringCoords.current.x = nextX;
      ringCoords.current.y = nextY;

      if (ringRef.current) {
        ringRef.current.style.left = `${nextX}px`;
        ringRef.current.style.top = `${nextY}px`;
      }

      animationFrameId = requestAnimationFrame(updateRingPosition);
    };

    // Listeners
    window.addEventListener('mousemove', onMouseMove);
    animationFrameId = requestAnimationFrame(updateRingPosition);
    
    // Set up hover listeners immediately
    setupListeners();

    // Re-bind hover listeners periodically in case of page content updates
    const interval = setInterval(setupListeners, 1500);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
      
      const interactives = document.querySelectorAll('a, button, select, input, textarea, .project-card, [role="button"]');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        id="cursor"
        ref={cursorRef}
        style={{
          width: hovered ? '20px' : '12px',
          height: hovered ? '20px' : '12px',
          backgroundColor: hovered ? 'rgba(255, 255, 255, 0.9)' : 'var(--accent)',
        }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        style={{
          width: hovered ? '56px' : '36px',
          height: hovered ? '56px' : '36px',
          borderColor: hovered ? 'rgba(255, 255, 255, 0.3)' : 'var(--accent)',
          backgroundColor: hovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
          opacity: hovered ? '0.3' : '0.6',
        }}
      />
    </>
  );
};

export default CustomCursor;
