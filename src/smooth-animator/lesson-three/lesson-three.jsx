
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./lesson-three.module.css";
import { Physics2DPlugin } from "../../../gsap-public/src/Physics2DPlugin";


gsap.registerPlugin(Physics2DPlugin); 


const LessonThree = () => {
  // const tl = gsap.timeline({repeat: -1, yoyo: true});

  // useGSAP(() => {

  //  tl.to(`.${styles.square}`, {
  //    rotation: 90,
  //    transformOrigin: "right bottom",
  //    duration: 3, 
  //   //  repeat: -1, 
  //   //  yoyo: true, 
  //  });
  // //  tl.set(`.${styles.square}`, {
  // //   x: "500px"
  // //  });
  //  tl.to(`.${styles.square}`, {
  //    rotation: 180,
  //    transformOrigin: "left bottom",
  //    duration: 3, 
  //   //  repeat: -1, 
  //   //  yoyo: true, 
  //  });
   
  // });
  useGSAP(() => {
  // const sq = document.querySelector(`.${styles.square}`);
  // const rect = sq.getBoundingClientRect();
  // const step = Math.round(rect.width); // distance to move each 90deg

  // gsap.set(sq, { rotation: 0, x: 0, transformOrigin: "center center", willChange: "transform" });

  // const tl = gsap.timeline({ repeat: -1 });
  // for (let i = 0; i < 4; i++) {
  //   tl.to(sq, {
  //     rotation: "+=90",
  //     x: `+=${step}`,
  //     duration: 0.6,
  //     ease: "power1.inOut"
  //   });
  // }
  gsap.to(`.${styles.square}`, {
  duration: 5,
  rotation: "+=90",
  physics2D: {
    velocity: 200,   // forward speed in px/sec
    angle: 0,        // 0° = move right, 90° = move down
    angularVelocity: 90 // deg/sec rotation speed
  },
  repeat: -1,
  ease: "none"
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

export default LessonThree;