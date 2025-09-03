import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/all";
import styles from "./lesson-one-assignment.module.css"; // Adjust the path as necessary

/*
INSTRUCTIONS
Get familiar with the Graph Editor, its Speed and Value Graph.

Create simple shape animations with unique temporal interpolations.

Animate two or more properties at the same time and adjust the graphs to create unique movements.

Happy creating!

*/
const LessonOneAssignment = () => {
 useGSAP(() => {
   // Note: GSAP can't directly target pseudo-elements like ::before
   // You'll need to create an actual element or use a different approach
   gsap.to(`.${styles.squareTop}`, {
     x: "50vw",
     rotation: 360,
     borderRadius: "100%",
     duration: 2, //  animate it back to its original position, rotation, and shape over 2 seconds,
     repeat: -1, // repeat the animation forever
     yoyo: true, // meaning it reverses direction each time
   });

   gsap.to(`.${styles.squareMiddle}`, {
     x: "50vw",
     rotation: 360,
     borderRadius: "100%",
     duration: 2, //  animate it back to its original position, rotation, and shape over 2 seconds,
     ease: "power1.inOut",
     repeat: -1, // repeat the animation forever
     yoyo: true, // meaning it reverses direction each time
   });
   gsap.to(`.${styles.squareBottom}`, {
     x: "50vw",
     rotation: 360,
     borderRadius: "100%",
     duration: 2, //  animate it back to its original position, rotation, and shape over 2 seconds,
     ease: CustomEase.create("custom", "M0,0 C0.366,0.118 0,1.43 1,1 "),
     repeat: -1, // repeat the animation forever
     yoyo: true, // meaning it reverses direction each time
   });

   // both properties animated with one tween
   gsap.from(`.${styles.squareLeft}`, {
    rotation: 360,        // Two full rotations
    scale: 0,          // Scale up to 150%
    duration: 2,
    ease: CustomEase.create("custom", "M0,0 C0.366,0.118 0,1.43 1,1 "),
    repeat: -1,
    // yoyo: true,
  });
   
  // // Rotation with one ease
  //   gsap.to(`.${styles.squareLeft}`, {
  //     rotation: 360,
  //     duration: 3,
  //     ease: "power2.in",
  //     repeat: -1,
  //     yoyo: true,
  //   });

  //   // Scale with different ease
  //   gsap.to(`.${styles.squareLeft}`, {
  //     scale: 0,
  //     duration: 3,
  //     ease: "power2.inOut",
  //     repeat: -1,
  //     yoyo: true,
  //   });
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
         <div className={`${styles.atom} ${styles.mc}`}>
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
