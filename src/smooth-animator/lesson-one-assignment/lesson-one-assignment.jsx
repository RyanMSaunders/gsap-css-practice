
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./lesson-one-assignment.module.css";
import { useRef, useState } from "react";


const LessonOneAssignment = () => {
  const containerRef = useRef(null);
  const [currentEase, setCurrentEase] = useState("")

  // Helper function to generate random colors
  const getRandomColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85929E', '#A569BD'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomEase = () => {
    // SIMPLIFIED ease array with more visible effects for movement
    const ease = [
    // === BASIC EASES ===
    'none',           // Linear - constant speed
    'power1.out',     // Gentle deceleration
    'power1.in',      // Gentle acceleration
    'power1.inOut',   // Gentle ease in and out
    
    // === POWER EASES (Quadratic, Cubic, Quartic) ===
    'power2.out',     // Quadratic deceleration (most common)
    'power2.in',      // Quadratic acceleration
    'power2.inOut',   // Quadratic ease in and out
    'power3.out',     // Cubic deceleration (stronger)
    'power3.in',      // Cubic acceleration
    'power3.inOut',   // Cubic ease in and out
    'power4.out',     // Quartic deceleration (very strong)
    'power4.in',      // Quartic acceleration
    'power4.inOut',   // Quartic ease in and out
    
    // === BACK EASES (Overshoot effect) ===
    'back.out',       // Overshoots target then settles
    'back.in',        // Pulls back before moving forward
    'back.inOut',     // Pulls back, overshoots, then settles
    'back.out(1.7)',  // Custom overshoot strength
    'back.in(1.7)',   // Custom pullback strength
    'back.inOut(1.7)', // Custom both directions
    
    // === ELASTIC EASES (Bouncy spring effect) ===
    'elastic.out',    // Springs past target multiple times
    'elastic.in',     // Springs before moving
    'elastic.inOut',  // Springs both directions
    'elastic.out(1, 0.3)', // Custom amplitude and period
    'elastic.in(1, 0.3)',  // Custom spring settings
    
    // === BOUNCE EASES (Ball dropping effect) ===
    'bounce.out',     // Bounces when reaching target
    'bounce.in',      // Bounces before starting
    'bounce.inOut',   // Bounces at both ends
    
    // === CIRCULAR EASES (Quarter circle curve) ===
    'circ.out',       // Circular deceleration
    'circ.in',        // Circular acceleration  
    'circ.inOut',     // Circular ease in and out
    
    // === SINE EASES (Smooth sine wave) ===
    'sine.out',       // Sine wave deceleration
    'sine.in',        // Sine wave acceleration
    'sine.inOut',     // Sine wave ease in and out
    
    // === EXPONENTIAL EASES (Very dramatic) ===
    'expo.out',       // Exponential deceleration
    'expo.in',        // Exponential acceleration
    'expo.inOut',     // Exponential ease in and out
    
    // === ROUGH EASES (Irregular, jumpy motion) ===
    'rough({ template: "none.out", strength: 1, points: 20, taper: "none", randomize: true, clamp: false})',
    'rough({ template: "sine.out", strength: 2, points: 50, taper: "out", randomize: false, clamp: true})',
    
    // === STEPS (Discrete jumps) ===
    'steps(12)',      // 12 discrete steps
    'steps(5)',       // 5 discrete steps (more choppy)
    'steps(20)',      // 20 discrete steps (smoother)
    
    // === LEGACY NAMES (still supported) ===
    'quad.out',       // Same as power2.out
    'cubic.out',      // Same as power3.out
    'quart.out',      // Same as power4.out
    'quint.out',      // Same as power4.out (approximately)

    
  ];
    return ease[Math.floor(Math.random() * ease.length)];
  };

  useGSAP(() => {
    const container = containerRef.current;
    const square = container.querySelector(`.${styles.square}`);

    if (!container || !square) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const squareSize = square.offsetWidth;

    // Movement boundaries
    const maxX = containerWidth - squareSize;
    const maxY = containerHeight - squareSize;

    // Initial position and velocity
    let currentX = 10;
    let currentY = 10;
    let velocityX = 3;
    let velocityY = 2;

    // Track current color for smooth transitions
    let currentColor = '#FF6B6B'; // Starting color
    let targetColor = currentColor; // Target color to transition to
    let colorAnimationTween = null; // Track active color animation
    let movementAnimationTween = null; // Track active movement animation

    gsap.set(square, { backgroundColor: currentColor });

    let bounceCount = 0;     // keeps track of collisions
    let lastEase = "power1.out"; // default ease at start

    const createBounceAnimation = () => {

      // Calculate next position
      const nextX = currentX + velocityX;
      const nextY = currentY + velocityY;

      let collision = false;

      // Check for collisions and handle bouncing
      if (nextX <= 0 || nextX >= maxX) {
        velocityX = -velocityX;
        currentX = Math.max(0, Math.min(maxX, nextX));
        collision = true;
      } else {
        currentX = nextX;
      }

      if (nextY <= 0 || nextY >= maxY) {
        velocityY = -velocityY;
        currentY = Math.max(0, Math.min(maxY, nextY));
        collision = true;
      } else {
        currentY = nextY;
      }

      // SOLUTION 1: Apply random ease to wall-to-wall movement (not frame-by-frame)
      if (collision) {
        // Kill any existing animations
        if (colorAnimationTween) colorAnimationTween.kill();
        if (movementAnimationTween) movementAnimationTween.kill();
        
        // Set new target color
        targetColor = getRandomColor();
        
        // Calculate time to next collision
        const timeToNextCollisionX = velocityX !== 0 ? Math.abs((velocityX > 0 ? maxX - currentX : currentX) / velocityX) : Infinity;
        const timeToNextCollisionY = velocityY !== 0 ? Math.abs((velocityY > 0 ? maxY - currentY : currentY) / velocityY) : Infinity;
        const timeToNextCollision = Math.min(timeToNextCollisionX, timeToNextCollisionY);
        
        // Convert to seconds
        const duration = timeToNextCollision * 0.016;
        
        // Calculate target position (where we'll be when next collision happens)
        const targetX = currentX + (velocityX * timeToNextCollision);
        const targetY = currentY + (velocityY * timeToNextCollision);

        // 🔑 Alternate between reusing and picking a new ease
        if (bounceCount % 2 === 0) {
          lastEase = getRandomEase();
        }
        bounceCount++;

        
        // Get random ease for this segment
        // const segmentEase = getRandomEase();
        setCurrentEase(lastEase);
        
        
        console.log(`New segment: ${duration.toFixed(2)}s with ease: ${lastEase}`);
        
        // ANIMATE THE ENTIRE SEGMENT with the chosen ease
        movementAnimationTween = gsap.to(square, {
          x: targetX,
          y: targetY,
          duration: duration,
          ease: lastEase,
          onUpdate: () => {
            // Update our tracking variables as GSAP moves the square
            currentX = gsap.getProperty(square, "x");
            currentY = gsap.getProperty(square, "y");
          },
          onComplete: () => {
            // When segment completes, start the next one
            createBounceAnimation();
          }
        });

        // Start color animation (same timing as movement)
        colorAnimationTween = gsap.to(square, {
          backgroundColor: targetColor,
          duration: duration,
          ease: 'power2.inOut'
        });
        
        return; // Don't continue with frame-by-frame animation
      }

      // If no collision, continue with next frame
      // (This only happens during the initial startup)
      gsap.delayedCall(0.016, createBounceAnimation);
    };

    createBounceAnimation();

  }, { scope: containerRef });

  return (
    <div className={styles.page}>
      <section className={styles.organism}>
        <article className={`${styles.molecule} ${styles.top}`}>
          <div className={`${styles.atom} ${styles.tl}`}></div>
          <div className={`${styles.atom} ${styles.tr}`}></div>
        </article>
        <article className={`${styles.molecule} ${styles.middle}`}>
          <div className={`${styles.atom} ${styles.ml}`}></div>
          <div className={`${styles.atom} ${styles.mc}`} ref={containerRef}>
            <div className={styles.square}>
              {currentEase}
              
            </div>
          </div>
          <div className={`${styles.atom} ${styles.mr}`}></div>
        </article>
        <article className={`${styles.molecule} ${styles.bottom}`}>
          <div className={`${styles.atom} ${styles.bl}`}></div>
          <div className={`${styles.atom} ${styles.br}`}></div>
        </article>
      </section>
    </div>
  );
};

export default LessonOneAssignment;



// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { CustomEase } from "gsap/all";
// import styles from "./lesson-one-assignment.module.css";
// import { useRef } from "react";

// const LessonOneAssignment = () => {
//   const containerRef = useRef(null);

//   // Helper function to generate random colors
//   const getRandomColor = () => {
//     const colors = [
//       '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
//       '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
//       '#F8C471', '#82E0AA', '#F1948A', '#85929E', '#A569BD'
//     ];
//     return colors[Math.floor(Math.random() * colors.length)];
//   };

//   const getRandomEase = () => {
//     const ease = [
//     // === BASIC EASES ===
//     'none',           // Linear - constant speed
//     'power1.out',     // Gentle deceleration
//     'power1.in',      // Gentle acceleration
//     'power1.inOut',   // Gentle ease in and out
    
//     // === POWER EASES (Quadratic, Cubic, Quartic) ===
//     'power2.out',     // Quadratic deceleration (most common)
//     'power2.in',      // Quadratic acceleration
//     'power2.inOut',   // Quadratic ease in and out
//     'power3.out',     // Cubic deceleration (stronger)
//     'power3.in',      // Cubic acceleration
//     'power3.inOut',   // Cubic ease in and out
//     'power4.out',     // Quartic deceleration (very strong)
//     'power4.in',      // Quartic acceleration
//     'power4.inOut',   // Quartic ease in and out
    
//     // === BACK EASES (Overshoot effect) ===
//     'back.out',       // Overshoots target then settles
//     'back.in',        // Pulls back before moving forward
//     'back.inOut',     // Pulls back, overshoots, then settles
//     'back.out(1.7)',  // Custom overshoot strength
//     'back.in(1.7)',   // Custom pullback strength
//     'back.inOut(1.7)', // Custom both directions
    
//     // === ELASTIC EASES (Bouncy spring effect) ===
//     'elastic.out',    // Springs past target multiple times
//     'elastic.in',     // Springs before moving
//     'elastic.inOut',  // Springs both directions
//     'elastic.out(1, 0.3)', // Custom amplitude and period
//     'elastic.in(1, 0.3)',  // Custom spring settings
    
//     // === BOUNCE EASES (Ball dropping effect) ===
//     'bounce.out',     // Bounces when reaching target
//     'bounce.in',      // Bounces before starting
//     'bounce.inOut',   // Bounces at both ends
    
//     // === CIRCULAR EASES (Quarter circle curve) ===
//     'circ.out',       // Circular deceleration
//     'circ.in',        // Circular acceleration  
//     'circ.inOut',     // Circular ease in and out
    
//     // === SINE EASES (Smooth sine wave) ===
//     'sine.out',       // Sine wave deceleration
//     'sine.in',        // Sine wave acceleration
//     'sine.inOut',     // Sine wave ease in and out
    
//     // === EXPONENTIAL EASES (Very dramatic) ===
//     'expo.out',       // Exponential deceleration
//     'expo.in',        // Exponential acceleration
//     'expo.inOut',     // Exponential ease in and out
    
//     // === ROUGH EASES (Irregular, jumpy motion) ===
//     'rough({ template: "none.out", strength: 1, points: 20, taper: "none", randomize: true, clamp: false})',
//     'rough({ template: "sine.out", strength: 2, points: 50, taper: "out", randomize: false, clamp: true})',
    
//     // === STEPS (Discrete jumps) ===
//     'steps(12)',      // 12 discrete steps
//     'steps(5)',       // 5 discrete steps (more choppy)
//     'steps(20)',      // 20 discrete steps (smoother)
    
//     // === LEGACY NAMES (still supported) ===
//     'quad.out',       // Same as power2.out
//     'cubic.out',      // Same as power3.out
//     'quart.out',      // Same as power4.out
//     'quint.out',      // Same as power4.out (approximately)
//   ];
//   return ease[Math.floor(Math.random() * ease.length)];
//   }

//   useGSAP(() => {
//     const container = containerRef.current;
//     const square = container.querySelector(`.${styles.square}`);

//     if (!container || !square) return;

//     const containerWidth = container.offsetWidth;
//     const containerHeight = container.offsetHeight;
//     const squareSize = square.offsetWidth;

//     // Movement boundaries
//     const maxX = containerWidth - squareSize;
//     const maxY = containerHeight - squareSize;

//     // Initial position and velocity
//     let currentX = 10;
//     let currentY = 10;
//     let velocityX = 3;
//     let velocityY = 2;

//     // Track current color for smooth transitions
//     let currentColor = '#FF6B6B'; // Starting color
//     let targetColor = currentColor; // Target color to transition to
//     let colorAnimationTween = null; // Track active color animation

//     let targetEase = 'power1.inOut'
//     gsap.set(square, { backgroundColor: currentColor });

//     const timeline = gsap.timeline({ repeat: -1 });

//     const createBounceAnimation = () => {
//       // Calculate next position
//       const nextX = currentX + velocityX;
//       const nextY = currentY + velocityY;

//       let collision = false;

//       // Check for collisions and handle bouncing
//       // The Problem We're Solving
//       // Imagine your square is at position x = 2 and moving right with velocityX = 3. Your container width is 400, so maxX = 350 (assuming square is 50px wide).
//       // Frame 1: currentX = 2, velocityX = 3

//       // nextX = 2 + 3 = 5 ✅ No collision (5 is between 0 and 350)
//       // currentX = 5 (just move normally)

//       // Frame 116: currentX = 347, velocityX = 3

//       // nextX = 347 + 3 = 350 ✅ Still okay (exactly at boundary)
//       // currentX = 350 (move normally)

//       // Frame 117: currentX = 350, velocityX = 3

//       // nextX = 350 + 3 = 353 ❌ COLLISION! (353 > maxX which is 350)
//       if (nextX <= 0 || nextX >= maxX) {
//         velocityX = -velocityX;
//         currentX = Math.max(0, Math.min(maxX, nextX));
//         collision = true;
//       } else {
//         currentX = nextX;
//       }

//       if (nextY <= 0 || nextY >= maxY) {
//         velocityY = -velocityY;
//         currentY = Math.max(0, Math.min(maxY, nextY));
//         collision = true;
//       } else {
//         currentY = nextY;
//       }

//       // If collision occurred, start a new color transition
//       if (collision) {
//         // Kill any existing color animation
//         if (colorAnimationTween) {
//           colorAnimationTween.kill();
//         }
        
//         // Set new target color and start gradual transition
//         targetColor = getRandomColor();
//         targetEase = getRandomEase();
        
//         // Calculate approximate time to reach next wall
//         // Real Example Scenario:
//         // Let's say after a collision, your square is at:

//         // Position: currentX = 100, currentY = 50
//         // Velocity: velocityX = 3 (moving right), velocityY = -2 (moving up)
//         // Boundaries: maxX = 400, maxY = 300

//         // Step 1: Calculate Horizontal Collision Time
//         // javascript// Moving right (velocityX = 3 > 0)
//         // // Distance to right wall = maxX - currentX = 400 - 100 = 300 pixels
//         // // Time = 300 ÷ 3 = 100 frames until right wall collision
//         // timeToNextCollisionX = 100
//         // Step 2: Calculate Vertical Collision Time
//         // javascript// Moving up (velocityY = -2 < 0)
//         // // Distance to top wall = currentY - 0 = 50 - 0 = 50 pixels  
//         // // Time = 50 ÷ 2 = 25 frames until top wall collision
//         // timeToNextCollisionY = 25
//         // Step 3: Choose the Winner
//         // javascript// Which happens first? 100 frames or 25 frames?
//         // timeToNextCollision = Math.min(100, 25) = 25
//         // // The square will hit the TOP WALL in 25 frames
//         // Why This Matters for Color Animation:
//         // javascript// 25 frames × 0.016 seconds/frame = 0.4 seconds
//         // colorTransitionDuration = 25 × 0.016 = 0.4 seconds
//         // So we start a color animation that takes exactly 0.4 seconds to complete. By the time the color finishes changing, the square will have traveled exactly 25 frames and hit the top wall, where a NEW collision will trigger a NEW color transition!
//         const timeToNextCollisionX = velocityX !== 0 ? Math.abs((velocityX > 0 ? maxX - currentX : currentX) / velocityX) : Infinity;
//         const timeToNextCollisionY = velocityY !== 0 ? Math.abs((velocityY > 0 ? maxY - currentY : currentY) / velocityY) : Infinity;
//         const timeToNextCollision = Math.min(timeToNextCollisionX, timeToNextCollisionY);
        
//         // Convert frame-based time to seconds (0.016 per frame)
//         const colorTransitionDuration = timeToNextCollision * 0.016;
        
//         // Start color animation that will complete by the time we hit the next wall
//         colorAnimationTween = gsap.to(square, {
//           backgroundColor: targetColor,
//           duration: colorTransitionDuration,
//           ease: targetEase
//         });
//       }

//       // Animate position
//       timeline.to(square, {
//         x: currentX,
//         y: currentY,
//         duration: 0.016,
//         ease: targetEase
//       });

//       timeline.call(createBounceAnimation);
//     };

//     createBounceAnimation();

//   }, { scope: containerRef });

//   return (
//     <div className={styles.page}>
//       <section className={styles.organism}>
//         <article className={`${styles.molecule} ${styles.top}`}>
//           <div className={`${styles.atom} ${styles.tl}`}></div>
//           <div className={`${styles.atom} ${styles.tr}`}></div>
//         </article>
//         <article className={`${styles.molecule} ${styles.middle}`}>
//           <div className={`${styles.atom} ${styles.ml}`}></div>
//           <div className={`${styles.atom} ${styles.mc}`} ref={containerRef}>
//             <div className={styles.square}></div>
//           </div>
//           <div className={`${styles.atom} ${styles.mr}`}></div>
//         </article>
//         <article className={`${styles.molecule} ${styles.bottom}`}>
//           <div className={`${styles.atom} ${styles.bl}`}></div>
//           <div className={`${styles.atom} ${styles.br}`}></div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default LessonOneAssignment;


// DRAFT 1
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { CustomEase } from "gsap/all";
// import styles from "./lesson-one-assignment.module.css"; // Adjust the path as necessary
// import { useRef } from "react";

// /*
// INSTRUCTIONS
// Get familiar with the Graph Editor, its Speed and Value Graph.

// Create simple shape animations with unique temporal interpolations.

// Animate two or more properties at the same time and adjust the graphs to create unique movements.

// Happy creating!

// */
// const LessonOneAssignment = () => {
//   const containerRef = useRef(null)

//  useGSAP(() => {
//   const container = containerRef.current;
//   const square = container.querySelector(`.${styles.square}`)

//   if (!container || !square ) return;

//   const containerWidth = container.offsetWidth;
//   const containerHeight = container.offsetHeight;
//   const squareSize = square.offsetWidth; 

//   // Movement boundaries
//   const maxX = containerWidth - squareSize;
//   const maxY = containerHeight - squareSize;

//   // Initial position and velocity
//   let currentX = 10;
//   let currentY = 10;
//   let velocityX = 3;
//   let velocityY = 2;

//   const timeline = gsap.timeline({ repeat: -1})

//   const createBounceAnimation = () => {
//     // calculate next position
//     currentX += velocityX;
//     currentY += velocityY;

//     // Check collisions, reverse direction
//     // Check collision: If the square hits the left edge (≤ 0) or right edge (≥ maxX)
//     // Reverse direction: Flip the horizontal velocity (3 becomes -3, or -3 becomes 3)
//     // Fix position: Clamp the square back inside bounds in case it went too far
//     // So when the square hits a wall, it bounces back and stays within the container boundaries.
//     if (currentX <= 0 || currentX >= maxX) {
//       velocityX = -velocityX;
//       //Math.min(maxX, currentX) = "Pick the smaller of maxX or currentX" Math.max(0, result) = "Pick the larger of 0 or that result"
//       currentX = Math.max(0, Math.min(maxX, currentX))
//     }
//     if (currentY <= 0 || currentY >= maxY) {
//       velocityY = -velocityY;
//       currentY = Math.max(0, Math.min(maxY, currentY))
//     }

//     timeline.to(square, {
//       x: currentX,
//       y: currentY,
//       duration: 0.016,
//       ease: 'power1.inOut'
//     })

//     timeline.call(createBounceAnimation)
//   };

//   createBounceAnimation();

   
//  }, { scope: containerRef});

//  return (
//    <div className={styles.page}>
//      <section className={styles.organism}>
//        <article className={`${styles.molecule} ${styles.top}`}>
//          <div className={`${styles.atom} ${styles.tl}`}></div>
//          <div className={`${styles.atom} ${styles.tr}`}></div>
//        </article>
//        <article className={`${styles.molecule} ${styles.middle}`}>
//          <div className={`${styles.atom} ${styles.ml}`}></div>
//          <div className={`${styles.atom} ${styles.mc}`} ref={containerRef}>
//           <div className={styles.square}></div>
          
//          </div>
//          <div className={`${styles.atom} ${styles.mr}`}></div>
//        </article>
//        <article className={`${styles.molecule} ${styles.bottom}`}>
//          <div className={`${styles.atom} ${styles.bl}`}></div>
//          <div className={`${styles.atom} ${styles.br}`}></div>
//        </article>
//      </section>
//    </div>
//  );
// };

// export default LessonOneAssignment;


// DRAFT 2
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { CustomEase } from "gsap/all";
// import styles from "./lesson-one-assignment.module.css";
// import { useRef } from "react";

// const LessonOneAssignment = () => {
//   const containerRef = useRef(null);

//   useGSAP(() => {
//     const container = containerRef.current;
//     const square = container.querySelector(`.${styles.square}`);

//     if (!container || !square) return;

//     const containerWidth = container.offsetWidth;
//     const containerHeight = container.offsetHeight;
//     const squareSize = square.offsetWidth;

//     // Movement boundaries
//     const maxX = containerWidth - squareSize;
//     const maxY = containerHeight - squareSize;

//     // Quadrant boundaries
//     const midX = containerWidth / 2;
//     const midY = containerHeight / 2;

//     // Initial position and velocity
//     let currentX = 10;
//     let currentY = 10;
//     let velocityX = 3;
//     let velocityY = 2;

//     // Store initial values for reset when changing quadrants
//     let initialColor = '#3498db'; // Default blue
//     let currentQuadrant = null;
//     let quadrantProgress = 3;

//     // Random values for each quadrant (generated once per quadrant visit)
//     let targetColor = initialColor;
//     let targetRotation = 0;
//     let targetOpacity = 1;
//     let targetBorderRadius = 0;

//     const timeline = gsap.timeline({ repeat: -1 });

//     // Helper functions
//     const getRandomColor = () => {
//       const colors = ['#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22'];
//       return colors[Math.floor(Math.random() * colors.length)];
//     };

//     const getRandomRotation = () => Math.random() * 360;
//     const getRandomOpacity = () => 0.3 + Math.random() * 0.7; // Between 30% and 100%
//     const getRandomBorderRadius = () => 500; // 0 to 50px for shape changes

//     const detectQuadrant = (x, y) => {
//       const centerX = x + squareSize / 2;
//       const centerY = y + squareSize / 2;

//       if (centerX < midX && centerY < midY) return 'top-left';
//       if (centerX >= midX && centerY < midY) return 'top-right';
//       if (centerX >= midX && centerY >= midY) return 'bottom-right';
//       if (centerX < midX && centerY >= midY) return 'bottom-left';
//     };

//     const calculateQuadrantProgress = (x, y, quadrant) => {
//       const centerX = x + squareSize / 2;
//       const centerY = y + squareSize / 2;

//       switch (quadrant) {
//         case 'top-left':
//           return Math.min(1, Math.max(0, 
//             ((midX - centerX) / midX + (midY - centerY) / midY) / 2
//           ));
//         case 'top-right':
//           return Math.min(1, Math.max(0,
//             ((centerX - midX) / midX + (midY - centerY) / midY) / 2
//           ));
//         case 'bottom-right':
//           return Math.min(1, Math.max(0,
//             ((centerX - midX) / midX + (centerY - midY) / midY) / 2
//           ));
//         case 'bottom-left':
//           return Math.min(1, Math.max(0,
//             ((midX - centerX) / midX + (centerY - midY) / midY) / 2
//           ));
//         default:
//           return 0;
//       }
//     };

//     const applyQuadrantEffects = (quadrant, progress) => {
//       const animationProps = {
//         duration: 0.016,
//         ease: 'power1.inOut'
//       };

//       switch (quadrant) {
//         case 'top-left':
//           // Gradually change color
//           const colorProgress = progress;
//           timeline.to(square, {
//             ...animationProps,
//             backgroundColor: gsap.utils.interpolate(initialColor, targetColor, colorProgress)
//           });
//           break;

//         case 'top-right':
//           // Gradually change shape (border-radius)
//           timeline.to(square, {
//             ...animationProps,
//             borderRadius: `${targetBorderRadius * progress}px`
//           });
//           break;

//         case 'bottom-right':
//           // Gradually rotate
//           timeline.to(square, {
//             ...animationProps,
//             rotation: targetRotation * progress
//           });
//           break;

//         case 'bottom-left':
//           // Gradually change opacity
//           timeline.to(square, {
//             ...animationProps,
//             opacity: 1 - ((1 - targetOpacity) * progress)
//           });
//           break;
//       }
//     };

//     const createBounceAnimation = () => {
//       // Calculate next position
//       currentX += velocityX;
//       currentY += velocityY;

//       // Check collisions and reverse direction
//       if (currentX <= 0 || currentX >= maxX) {
//         velocityX = -velocityX;
//         currentX = Math.max(0, Math.min(maxX, currentX));
//       }
//       if (currentY <= 0 || currentY >= maxY) {
//         velocityY = -velocityY;
//         currentY = Math.max(0, Math.min(maxY, currentY));
//       }

//       // Detect current quadrant
//       const newQuadrant = detectQuadrant(currentX, currentY);

//       // If entering a new quadrant, generate new random targets
//       if (newQuadrant !== currentQuadrant) {
//         currentQuadrant = newQuadrant;
        
//         // Generate new random values for this quadrant
//         switch (currentQuadrant) {
//           case 'top-left':
//             targetColor = getRandomColor();
//             break;
//           case 'top-right':
//             targetBorderRadius = getRandomBorderRadius();
//             break;
//           case 'bottom-right':
//             targetRotation = getRandomRotation();
//             break;
//           case 'bottom-left':
//             targetOpacity = getRandomOpacity();
//             break;
//         }
//       }

//       // Calculate progress within current quadrant
//       quadrantProgress = calculateQuadrantProgress(currentX, currentY, currentQuadrant);

//       // Apply position animation
//       timeline.to(square, {
//         x: currentX,
//         y: currentY,
//         duration: 0.016,
//         ease: 'power1.inOut'
//       });

//       // Apply quadrant-specific effects
//       if (currentQuadrant) {
//         applyQuadrantEffects(currentQuadrant, quadrantProgress);
//       }

//       timeline.call(createBounceAnimation);
//     };

//     createBounceAnimation();

//   }, { scope: containerRef });

//   return (
//     <div className={styles.page}>
//       <section className={styles.organism}>
//         <article className={`${styles.molecule} ${styles.top}`}>
//           <div className={`${styles.atom} ${styles.tl}`}></div>
//           <div className={`${styles.atom} ${styles.tr}`}></div>
//         </article>
//         <article className={`${styles.molecule} ${styles.middle}`}>
//           <div className={`${styles.atom} ${styles.ml}`}></div>
//           <div className={`${styles.atom} ${styles.mc}`} ref={containerRef}>
//             <div className={styles.square}></div>
//           </div>
//           <div className={`${styles.atom} ${styles.mr}`}></div>
//         </article>
//         <article className={`${styles.molecule} ${styles.bottom}`}>
//           <div className={`${styles.atom} ${styles.bl}`}></div>
//           <div className={`${styles.atom} ${styles.br}`}></div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default LessonOneAssignment;
