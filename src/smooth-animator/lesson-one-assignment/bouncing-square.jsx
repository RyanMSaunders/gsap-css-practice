import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const BouncingSquare = () => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    const container = containerRef.current;
    const square = container.querySelector('#bouncing-square');
    
    if (!container || !square) return; // Exit early if either is missing

    // Get dimensions
    const containerWidth = container.offsetWidth; // built-in JavaScript property that gives you the actual rendered width of an HTML element in pixels.
    const containerHeight = container.offsetHeight;
    const squareSize = 32; // 8 * 4 (w-8 h-8 in Tailwind)
    
    // Calculate movement boundaries
    const maxX = containerWidth - squareSize;
    const maxY = containerHeight - squareSize;
    
    // Set initial position and velocity
    let currentX = 10;
    let currentY = 10;
    let velocityX = 3;
    let velocityY = 2;
    
    // Create the animation timeline
    const timeline = gsap.timeline({ repeat: -1 });
    
    // Animation function
    const createBounceAnimation = () => {
      // Calculate next position
      currentX += velocityX;
      currentY += velocityY;
      
      // Check for collisions and reverse direction
      if (currentX <= 0 || currentX >= maxX) {
        velocityX = -velocityX;
        currentX = Math.max(0, Math.min(maxX, currentX));
      }
      
      if (currentY <= 0 || currentY >= maxY) {
        velocityY = -velocityY;
        currentY = Math.max(0, Math.min(maxY, currentY));
      }
      
      // Add animation step to timeline
      timeline.to(square, {
        x: currentX,
        y: currentY,
        duration: 0.016, // ~60fps
        ease: "none"
      });
      
      // Continue the animation
      timeline.call(createBounceAnimation);
    };
    
    // Start the bouncing animation
    createBounceAnimation();
    
  }, { scope: containerRef }); // Scope to container for better performance

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-bold text-gray-800">Bouncing Square with useGSAP</h2>
      
      {/* Container that acts as the "boundaries" for our bouncing square */}
      <div 
        ref={containerRef}  // Ref allows us to access this element in useGSAP
        className="relative w-96 h-64 bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden"
      >
        {/* The square that will bounce around */}
        <div 
          id="bouncing-square"  // ID allows GSAP to target this element
          className="absolute w-8 h-8 bg-blue-500 rounded shadow-lg"
          style={{ left: '10px', top: '10px' }}  // Initial position
        />
      </div>
      
      <div className="text-sm text-gray-600 max-w-md text-center">
        <p>Using the useGSAP hook with timeline for bouncing animation. The square maintains steady velocity and bounces off container edges.</p>
      </div>
    </div>
  );
};

export default BouncingSquare;