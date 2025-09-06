import React, { useRef} from "react";
import gsap from "gsap";
// import { MotionPathPlugin, MotionPathHelper } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import styles from "./lesson-two.module.css";
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { MotionPathHelper } from "../../../gsap-public/src/MotionPathHelper.js";

gsap.registerPlugin(MotionPathPlugin, MotionPathHelper); 



const LessonTwo = () => {
  const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: false });
 const squareRef = useRef(null); // element to animate
  const pathRef = useRef(null);   // SVG path

  useGSAP(() => {
  const tween1 = gsap.to(squareRef.current, {
    duration: 5,
    // repeat: -1,
    // yoyo: true,
    motionPath: {
      path: pathRef.current,
      align: pathRef.current,
      alignOrigin: [0.5, 0.5],
      autoRotate: true
    },
    ease: "power1.inOut"
  });
    // timeline.to(`.${styles.square}`, {
    //   x: 250,
    //   y: 250,
    //   rotation: 360,
    //   // borderRadius: "100%",
    //   duration: 1,
    //   ease: "elastic.inOut",
    //   curviness: 1.5,   // makes it "bezier-like"
    // });

  // Create helper AFTER the tween
  MotionPathHelper.create(tween1);
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
            <svg viewBox="0 0 500 200" className={styles.svg}>
              <path
                ref={pathRef} // attach ref here
                d="M50,150 C80,120 115.984,43.973 142.388,19.273 166.37433,5.671 190.36067,-7.931 214.347,-21.533 234.14733,1.56133 253.94767,24.65567 273.748,47.75 274.73735,56.25535 275.7267,64.7607 276.71605,73.26605 231.56303,101.60837 122.444,97.061 141.257,158.293 184.011,213.44 239.40487,124.00299 288.47881,106.85798 316.73287,96.98665 344.98694,87.11533 373.241,77.244 386.92733,89.596 400.61367,101.948 414.3,114.3 426.2,126.2 438.1,138.1 450,150 "
                fill="none"
                stroke="black" // visible during development
              />
            </svg>
            <div className={styles.square} ref={squareRef}>
              
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

export default LessonTwo;


