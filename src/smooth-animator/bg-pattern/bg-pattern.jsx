
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./bg-pattern.module.css";


const BgPattern = () => {
  useGSAP(() => {
    gsap.to(`.${styles.square}`, {
      x: "500px",
      rotation: 360,
      borderRadius: "100%",
      duration: 3,
      repeat: -1,
      yoyo: true,
//       stagger: {
//   amount: 3,
  
//   // Start from the first element (default)
//   // from: "start",

//   // Start from the last element
//   // from: "end",

//   // Start from the middle element and move outward
//   // from: "center",

//   // Start from the outer edges and move inward
//   // from: "edges",

//   // Randomize start times for each element
//   // from: "random",

//   // Use a specific numeric index (0-based)
//   // from: 5,  // starts stagger from the 6th element

//   // Use a function that returns the starting index
//   // from: i => i % 2 === 0 ? 0 : 10
// }
    });
  });

  // Create a grid with 20 x 30 organisms
  const organisms = Array.from({ length: 20 * 30 });

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {organisms.map((_, i) => (
          <section key={i} className={styles.organism}>
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
        ))}
      </div>
    </div>
    // <div className={styles.page}>
    //       <section className={styles.organism}>
    //         <article className={`${styles.molecule} ${styles.top}`}>
    //           <div className={`${styles.atom} ${styles.tl}`}></div>
    //           <div className={`${styles.atom} ${styles.tr}`}></div>
    //         </article>
    //         <article className={`${styles.molecule} ${styles.middle}`}>
    //           <div className={`${styles.atom} ${styles.ml}`}></div>
    //           <div className={`${styles.atom} ${styles.mc}`}>
    //             <div className={styles.square}>
                  
    //             </div>
    //           </div>
    //           <div className={`${styles.atom} ${styles.mr}`}></div>
    //         </article>
    //         <article className={`${styles.molecule} ${styles.bottom}`}>
    //           <div className={`${styles.atom} ${styles.bl}`}></div>
    //           <div className={`${styles.atom} ${styles.br}`}></div>
    //         </article>
    //       </section>
    //     </div>
  );
};

export default BgPattern;
