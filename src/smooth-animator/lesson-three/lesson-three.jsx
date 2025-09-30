
import gsap from "gsap";
window.gsap = gsap; // used to export video

import { useGSAP } from "@gsap/react";
import styles from "./lesson-three.module.css";
import { Physics2DPlugin } from "../../../gsap-public/src/Physics2DPlugin";
import { CSSPlugin } from "../../../gsap-public/src/CSSPlugin";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CSSPlugin); 

CSSPlugin.defaultSmoothOrigin = true;


// gsap.registerPlugin(Physics2DPlugin); 


const LessonThree = () => {
  
//   useGSAP(() => {
//     const tl = gsap.timeline({ repeat: -1, yoyo: true })
  
//   tl.to(`.${styles.rect}`, {
//     duration: 2,
//     rotation: "+=90",
//     smoothOrigin: true, // says "use the Origin from the visual space, not from where it started"
//     transformOrigin: "right bottom",
//     // repeat: -1,
//     ease: CustomEase.create("custom", "M0,0 C0.953,0 0.98,0.844 1,1 "),
//     yoyoEase: true
//   })
//   .to(`.${styles.rect}`, {
//     duration: 2,
//     rotation: "+=90",
//     // smoothOrigin: true,
//     transformOrigin: "right top",
//     // repeat: -1,
//     ease: CustomEase.create("custom", "M0,0 C0.953,0 0.98,0.844 1,1 "),
//     yoyoEase: true
//   })
//   .to(`.${styles.rect}`, {
//     duration: 2,
//     rotation: "+=90",
//     // smoothOrigin: true,
//     transformOrigin: "left top",
//     // repeat: -1,
//     ease: CustomEase.create("custom", "M0,0 C0.953,0 0.98,0.844 1,1 "),
//     yoyoEase: true
//   })
//   .to(`.${styles.rect}`, {
//     duration: 2,
//     rotation: "+=90",
//     // smoothOrigin: true,
//     transformOrigin: "left bottom",
//     // repeat: -1,
//     ease: CustomEase.create("custom", "M0,0 C0.953,0 0.98,0.844 1,1 "),
//     yoyoEase: true
//   });
// });

 
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
                <radialGradient id="circleGradient" cx="0%" cy="5%" r="100%">
                  <stop offset="0%" stopColor="#FFE7FF" />
                  <stop offset="100%" stopColor="#531DA0" />
                </radialGradient>
                <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feComponentTransfer in="SourceAlpha">
                    <feFuncA type="table" tableValues="1 0" />
                  </feComponentTransfer>
                  <feGaussianBlur stdDeviation="4"/>
                  <feOffset dx="0" dy="0" result="offsetblur"/>
                  <feFlood flood-color="rgb(0, 0, 0)" result="color"/>
                  <feComposite in2="offsetblur" operator="in"/>
                  <feComposite in2="SourceAlpha" operator="in" />
                  <feMerge>
                    <feMergeNode in="SourceGraphic" />
                    <feMergeNode />
                  </feMerge>
                </filter>
                
              </defs>
              <rect
                className={styles.rect}
                x="10"
                y="100"
                width="100"
                height="100"
                fill="url(#rollingSquareGradient)" 
                stroke="#FF5B38"
                strokeWidth="0.3"
              />
              < circle
                className={styles.circle}
                cx="95"
                cy="100"
                r="30"
                // width="100"
                // height="100"
                fill="url(#circleGradient)" 
                filter="url(#inset-shadow)"
               />
    
              
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