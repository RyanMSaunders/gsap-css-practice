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
  const square = container.querySelector(`${styles.square}`)

  if (!container || !square ) return;

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const squareHeight = container.offsetHeight;
  const squareSize = squareHeight;

  // Movement boundaries
  const maxX = containerWidth - squareSize;
  const maxY = containerHeight - squareSize;

  // Initial position and velocity
  let currentX = 10;
  let currentY = 10;
  let velocityX = 3;
  let velocityY = 2;

  const timeline = gsap.timeline({ repeat: -1})

   
 });

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
