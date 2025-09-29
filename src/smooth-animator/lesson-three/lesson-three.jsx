
import gsap from "gsap";
window.gsap = gsap; // used to export video

import { useGSAP } from "@gsap/react";
import styles from "./lesson-three.module.css";
import { Physics2DPlugin } from "../../../gsap-public/src/Physics2DPlugin";
import { CSSPlugin } from "../../../gsap-public/src/CSSPlugin";

gsap.registerPlugin(CSSPlugin); 

CSSPlugin.defaultSmoothOrigin = true;


// gsap.registerPlugin(Physics2DPlugin); 


const LessonThree = () => {
  
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
  
  tl.to(`.${styles.rect}`, {
    duration: 2,
    rotation: "+=90",
    smoothOrigin: true,
    transformOrigin: "right bottom",
    // repeat: -1,
    ease: "power1.inOut"
  })
  .to(`.${styles.rect}`, {
    duration: 2,
    rotation: "+=90",
    // smoothOrigin: true,
    transformOrigin: "right top",
    // repeat: -1,
    ease: "power1.inOut"
  })
  .to(`.${styles.rect}`, {
    duration: 2,
    rotation: "+=90",
    // smoothOrigin: true,
    transformOrigin: "left top",
    // repeat: -1,
    ease: "power1.inOut"
  })
  .to(`.${styles.rect}`, {
    duration: 2,
    rotation: "+=90",
    // smoothOrigin: true,
    transformOrigin: "left bottom",
    // repeat: -1,
    ease: "power1.inOut"
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

          {/* <div className={styles.svgContainer}> */}
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" className={styles.svg} preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="rollingSquareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5B38" />
                  <stop offset="100%" stopColor="#FFFF00" />
                </linearGradient>
              </defs>
              <rect
                className={styles.rect}
                x="10"
                y="100"
                width="100"
                height="100"
                fill="url(#rollingSquareGradient)" 
                stroke="rgb(0, 0, 0)"
                strokeWidth="4"
              />
              {/* <rect
                className={styles.rect}
                x="0"
                y="0"
                width="200"
                height="200"
                style={{
                  fill: "rgb(216, 216, 216)",
                  stroke: "rgb(0, 0, 0)",
                  strokeWidth: "4"
                }}
              /> */}
            </svg>

              
            </div>
          {/* </div> */}
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