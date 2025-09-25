
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./lesson-three-assignment.module.css";


const LessonThreeAssignment = () => {
  useGSAP(() => {
   // Note: GSAP can't directly target pseudo-elements like ::before
   // You'll need to create an actual element or use a different approach
   gsap.to(`.${styles.square}`, {
     x: "500px",
     rotation: 360,
     borderRadius: "100%",
     duration: 3, //  animate it back to its original position, rotation, and shape over 2 seconds,
     repeat: -1, // repeat the animation forever
     yoyo: true, // meaning it reverses direction each time
   });
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
            <div className={styles.square}>
              
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

export default LessonThreeAssignment;