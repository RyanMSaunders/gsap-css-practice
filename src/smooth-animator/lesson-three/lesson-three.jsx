import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./lesson-three.module.css";


const LessonThree = () => {
  const squareRef = useRef(null);

  useGSAP(() => {
    const square = squareRef.current;
    const size = square.offsetWidth; // dynamically measured size (px)
    const tl = gsap.timeline({yoyo: true});

   tl.to(`.${styles.square}`, {
     rotation: 90,
     x: `+=${size}`,
     transformOrigin: "right bottom",
     duration: 3, 
    //  repeat: -1, 
    //  yoyo: true, 
   });
   tl.to(`.${styles.square}`, {
     rotation: 90,
     x: `+=${size}`,
     transformOrigin: "right bottom",
     duration: 3, 
    //  repeat: -1, 
    //  yoyo: true, 
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
            <div ref={squareRef} className={styles.square}>
              
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

export default LessonThree;