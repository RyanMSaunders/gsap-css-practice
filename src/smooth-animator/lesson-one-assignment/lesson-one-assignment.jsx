import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/all";
import styles from "./lesson-one-assignment.module.css"; // Adjust the path as necessary
import { useRef } from "react";

/*
INSTRUCTIONS
Get familiar with the Graph Editor, its Speed and Value Graph.

Create simple shape animations with unique temporal interpolations.

Animate two or more properties at the same time and adjust the graphs to create unique movements.

Happy creating!

*/
const LessonOneAssignment = () => {
  const containerRef = useRef(null)

 useGSAP(() => {
  const container = containerRef.current;
  const square = container.querySelector(`.${styles.square}`)

  if (!container || !square ) return;

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

  const timeline = gsap.timeline({ repeat: -1})

  const createBounceAnimation = () => {
    // calculate next position
    currentX += velocityX;
    currentY += velocityY;

    // Check collisions, reverse direction
    // Check collision: If the square hits the left edge (≤ 0) or right edge (≥ maxX)
    // Reverse direction: Flip the horizontal velocity (3 becomes -3, or -3 becomes 3)
    // Fix position: Clamp the square back inside bounds in case it went too far
    // So when the square hits a wall, it bounces back and stays within the container boundaries.
    if (currentX <= 0 || currentX >= maxX) {
      velocityX = -velocityX;
      //Math.min(maxX, currentX) = "Pick the smaller of maxX or currentX" Math.max(0, result) = "Pick the larger of 0 or that result"
      currentX = Math.max(0, Math.min(maxX, currentX))
    }
    if (currentY <= 0 || currentY >= maxY) {
      velocityY = -velocityY;
      currentY = Math.max(0, Math.min(maxY, currentY))
    }

    timeline.to(square, {
      x: currentX,
      y: currentY,
      duration: 0.016,
      ease: 'power1.inOut'
    })

    timeline.call(createBounceAnimation)
  };

  createBounceAnimation();

   
 }, { scope: containerRef});

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
          <div className={styles.square}></div>
          
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
