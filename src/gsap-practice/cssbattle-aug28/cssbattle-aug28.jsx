
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import styles from "./cssbattle-aug28.module.css";
import styles from "./cssbattle-aug28.module.css"; // Adjust the path as necessary

const CSSBattleAug28 = () => {
 useGSAP(() => {
   // Note: GSAP can't directly target pseudo-elements like ::before
   // You'll need to create an actual element or use a different approach
   gsap.from(`.${styles.square}`, {
     x: 250,
     rotation: 360,
     borderRadius: "100%",
     duration: 2, //  animate it back to its original position, rotation, and shape over 2 seconds,
     ease: "power1.inOut",
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

export default CSSBattleAug28;
