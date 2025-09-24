import React, { useRef} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import { MotionPathHelper } from "../../../gsap-public/src/MotionPathHelper.js";

import styles from "./lesson-two-assignment.module.css";

gsap.registerPlugin(MotionPathPlugin, MotionPathHelper)


const LessonTwoAssignment = () => {
  const squareRef = useRef(null)
  const pathRef1 = useRef(null)
    const pathRef2 = useRef(null)


  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1});
    gsap.set(squareRef.current, { scale: 0 });

  tl.to(squareRef.current, {
    duration: 2,
    motionPath: {
      path: pathRef1.current,
      align: pathRef1.current,
      alignOrigin: [0.5, 0.5],
      start: 1,
      end: 0
    },
    ease: "power1.out",
    scale: 1
  });
    tl.to(squareRef.current, {
    duration: 2,
    motionPath: {
      path: pathRef2.current,
      align: pathRef2.current,
      alignOrigin: [0.5, 0.5]
    },
    ease: "power1.in",
    scale: 0.4
  });

  // then move along the second motion path


//   const tween1 = gsap.to(squareRef.current, {
//     duration: 2,
//     motionPath: {
//       path: pathRef2.current,
//       align: pathRef2.current,
//       alignOrigin: [0.5, 0.5]
//     },
//     ease: "power1.in",
//     scale: 0.8
//   });

//   // then move along the second motion path
//  const tween2 = gsap.to(squareRef.current, {
//     duration: 2,
//     motionPath: {
//       path: pathRef1.current,
//       align: pathRef1.current,
//       alignOrigin: [0.5, 0.5]
//     },
//     ease: "power1.out",
//     scale: 0.5
//   });
  //  MotionPathHelper.create(tween1);
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
            <svg 
              className={`${styles.svg}`}
              viewBox="0 0 400 250" 
              xmlns="http://www.w3.org/2000/svg"
              // style={{ border: "1px solid red" }}  // optional, just to see the box
            >
              <path 
                d="M39.692,79.442 C61.675,46.426 149.643,24.408 215.204,27.71 268.844,30.408 322,73 340,100 360,130 300,190 200,190 160,190 111.061,129.314 118.418,95.617 123.1955,73.7016 191.184,22.657 243.652,23.239 321.122,24.098 341.904,50.162 362.541,61.218 "
                stroke="none" 
                strokeWidth="4" 
                fill="none"
                ref={pathRef2}
              />
               <path 
                d="M39.763,80.531 C20.448,109.513 69.745,113.538 72.135,105.023 77.707,85.151 53.7691,46.5872 65.394,35.95 96.205,7.715 141.624,20.494 150.181,48.985 167.585,107.13 90.237,106.548 109.889,154.292 134.883,215.037 227.516,176.207 211.888,225.511  " 
                stroke="none" 
                strokeWidth="4" 
                fill="none"
                ref={pathRef1}
              />
            </svg>
          
            <div className={styles.square} ref={squareRef}></div>

            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
            
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

export default LessonTwoAssignment;


