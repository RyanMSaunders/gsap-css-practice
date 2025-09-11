
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
 GsapFrom,
 GsapFromTo,
 GsapScrollTrigger,
 GsapStagger,
 GsapText,
 GsapTimeline,
 GsapTo,
 Home,
} from "./pages";
import CSSBattleAug28 from "./gsap-practice/cssbattle-aug28/cssbattle-aug28";
import LessonOne from "./smooth-animator/lesson-one/lesson-one";
import GSAPSpeedVisualizer from "./smooth-animator/speed-graph-visualizer/speedGraphVisualizer";
import LessonOneAssignment from "./smooth-animator/lesson-one-assignment/lesson-one-assignment";
import LessonTwo from "./smooth-animator/lesson-two/lesson-two";
import LessonTwoAssignment from "./smooth-animator/lesson-two-assignment/lesson-two-assignment";

const App = () => {
 return (
   <div className="bg-black min-h-screen w-full">
     <Router>
       <Routes>
         <Route path="/speed-graph-visualizer" element={<GSAPSpeedVisualizer />} />
         <Route path="/lesson-one" element={<LessonOne />} />
         <Route path="/lesson-one-assignment" element={<LessonOneAssignment />} />
         <Route path="/lesson-two" element={<LessonTwo />} />
          <Route path="/lesson-two-assignment" element={<LessonTwoAssignment />} />
         <Route path="/cssbattle-aug28" element={<CSSBattleAug28 />} />

         <Route path="/gsapto" element={<GsapTo />} />
         <Route path="/gsapfrom" element={<GsapFrom />} />
         <Route path="/gsapfromto" element={<GsapFromTo />} />
         <Route path="/gsaptimeline" element={<GsapTimeline />} />
         <Route path="/gsapstagger" element={<GsapStagger />} />
         <Route path="/gsapscrolltrigger" element={<GsapScrollTrigger />} />
         <Route path="/gsaptext" element={<GsapText />} />
         <Route path="/" element={<Home />} />
       </Routes>
     </Router>
   </div>
 );
};

export default App;
