// import React, { useState, useEffect, useRef } from 'react';


// const GSAPSpeedVisualizer = () => {
//   const [selectedEase, setSelectedEase] = useState('power1.inOut');
//   const [customBezier, setCustomBezier] = useState('');
//   const positionCanvasRef = useRef(null);
//   const speedCanvasRef = useRef(null);
//   const demoSquareRef = useRef(null);


//   // Easing functions mapping
//   const easingFunctions = {
//     'power1.inOut': [0.42, 0, 0.58, 1],
//     'power2.inOut': [0.37, 0, 0.63, 1],
//     'power3.inOut': [0.32, 0, 0.67, 1],
//     'power1.in': [0.42, 0, 1, 1],
//     'power2.in': [0.55, 0.06, 0.68, 0.19],
//     'power1.out': [0, 0, 0.58, 1],
//     'power2.out': [0.25, 0.46, 0.45, 0.94],
//     'sine.inOut': [0.37, 0, 0.63, 1],
//     'back.inOut': [0.68, -0.6, 0.32, 1.6]
//   };


//   // Cubic bezier calculation
//   const cubicBezierEase = (t, x1, y1, x2, y2) => {
//     // Simplified cubic bezier for easing (0,0) to (1,1) with control points
//     const cx = 3 * x1;
//     const bx = 3 * (x2 - x1) - cx;
//     const ax = 1 - cx - bx;
  
//     const cy = 3 * y1;
//     const by = 3 * (y2 - y1) - cy;
//     const ay = 1 - cy - by;
  
//     // Newton-Raphson method to find t for given x
//     let x = t;
//     for (let i = 0; i < 10; i++) {
//       const currentX = ((ax * x + bx) * x + cx) * x;
//       const currentSlope = (3 * ax * x + 2 * bx) * x + cx;
//       x = x - (currentX - t) / currentSlope;
//     }
  
//     return ((ay * x + by) * x + cy) * x;
//   };


//   const drawPositionChart = (bezierValues) => {
//     const canvas = positionCanvasRef.current;
//     if (!canvas) return;
  
//     const ctx = canvas.getContext('2d');
//     const width = canvas.width = 400;
//     const height = canvas.height = 200;
  
//     ctx.clearRect(0, 0, width, height);
  
//     // Grid
//     ctx.strokeStyle = '#444';
//     ctx.lineWidth = 1;
//     for (let i = 0; i <= 10; i++) {
//       const x = (width / 10) * i;
//       const y = (height / 10) * i;
//       ctx.beginPath();
//       ctx.moveTo(x, 0);
//       ctx.lineTo(x, height);
//       ctx.stroke();
//       ctx.beginPath();
//       ctx.moveTo(0, y);
//       ctx.lineTo(width, y);
//       ctx.stroke();
//     }
  
//     // Curve
//     ctx.strokeStyle = '#00d4aa';
//     ctx.lineWidth = 3;
//     ctx.beginPath();
  
//     for (let i = 0; i <= 100; i++) {
//       const t = i / 100;
//       const progress = cubicBezierEase(t, ...bezierValues);
//       const x = t * width;
//       const y = height - (progress * height);
    
//       if (i === 0) {
//         ctx.moveTo(x, y);
//       } else {
//         ctx.lineTo(x, y);
//       }
//     }
//     ctx.stroke();
//   };


//   const drawSpeedChart = (bezierValues) => {
//     const canvas = speedCanvasRef.current;
//     if (!canvas) return;
  
//     const ctx = canvas.getContext('2d');
//     const width = canvas.width = 400;
//     const height = canvas.height = 200;
  
//     ctx.clearRect(0, 0, width, height);
  
//     // Grid
//     ctx.strokeStyle = '#444';
//     ctx.lineWidth = 1;
//     for (let i = 0; i <= 10; i++) {
//       const x = (width / 10) * i;
//       const y = (height / 10) * i;
//       ctx.beginPath();
//       ctx.moveTo(x, 0);
//       ctx.lineTo(x, height);
//       ctx.stroke();
//       ctx.beginPath();
//       ctx.moveTo(0, y);
//       ctx.lineTo(width, y);
//       ctx.stroke();
//     }
  
//     // Calculate speed (derivative)
//     ctx.strokeStyle = '#ff6b6b';
//     ctx.lineWidth = 3;
//     ctx.beginPath();
  
//     const speeds = [];
//     const dt = 0.001;
  
//     for (let i = 0; i <= 100; i++) {
//       const t = i / 100;
//       const progress1 = cubicBezierEase(Math.max(0, t - dt), ...bezierValues);
//       const progress2 = cubicBezierEase(Math.min(1, t + dt), ...bezierValues);
//       const speed = (progress2 - progress1) / (2 * dt);
//       speeds.push(speed);
//     }
  
//     const maxSpeed = Math.max(...speeds);
  
//     for (let i = 0; i <= 100; i++) {
//       const t = i / 100;
//       const normalizedSpeed = speeds[i] / maxSpeed;
//       const x = t * width;
//       const y = height - (normalizedSpeed * height);
    
//       if (i === 0) {
//         ctx.moveTo(x, y);
//       } else {
//         ctx.lineTo(x, y);
//       }
//     }
//     ctx.stroke();
//   };


//   const drawCharts = () => {
//     let bezierValues;
  
//     if (customBezier.trim()) {
//       const values = customBezier.split(',').map(v => parseFloat(v.trim()));
//       if (values.length === 4 && values.every(v => !isNaN(v))) {
//         bezierValues = values;
//       } else {
//         bezierValues = easingFunctions[selectedEase];
//       }
//     } else {
//       bezierValues = easingFunctions[selectedEase];
//     }
  
//     drawPositionChart(bezierValues);
//     drawSpeedChart(bezierValues);
//   };


//   const runDemo = () => {
//     const square = demoSquareRef.current;
//     if (!square || !window.gsap) return;
  
//     let ease;
//     if (customBezier.trim()) {
//       const values = customBezier.split(',').map(v => parseFloat(v.trim()));
//       if (values.length === 4 && values.every(v => !isNaN(v))) {
//         ease = `cubic-bezier(${values.join(', ')})`;
//       } else {
//         ease = selectedEase;
//       }
//     } else {
//       ease = selectedEase;
//     }
  
//     window.gsap.fromTo(square,
//       { x: -100 },
//       {
//         x: 100,
//         duration: 2,
//         ease: ease,
//         yoyo: true,
//         repeat: 1
//       }
//     );
//   };


//   const getGsapCode = () => {
//     let easeName;
  
//     if (customBezier.trim()) {
//       const values = customBezier.split(',').map(v => parseFloat(v.trim()));
//       if (values.length === 4 && values.every(v => !isNaN(v))) {
//         easeName = `cubic-bezier(${values.join(', ')})`;
//       } else {
//         easeName = selectedEase;
//       }
//     } else {
//       easeName = selectedEase;
//     }
  
//     return `ease: "${easeName}"`;
//   };


//   useEffect(() => {
//     // Load GSAP
//     if (!window.gsap) {
//       const script = document.createElement('script');
//       script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
//       script.onload = () => {
//         drawCharts();
//       };
//       document.head.appendChild(script);
//     } else {
//       drawCharts();
//     }
//   }, [selectedEase, customBezier]);


//   return (
//     <div className="max-w-4xl mx-auto p-5 bg-gray-900 text-white min-h-screen">
//       <h1 className="text-center text-3xl font-bold mb-8 text-teal-400">
//         GSAP Speed Graph Visualizer
//       </h1>
    
//       <div className="bg-gray-800 rounded-lg p-5 mb-5">
//         <div className="mb-4">
//           <label htmlFor="easeSelect" className="block mb-2 text-teal-400">
//             Select Ease Type:
//           </label>
//           <select
//             id="easeSelect"
//             value={selectedEase}
//             onChange={(e) => setSelectedEase(e.target.value)}
//             className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
//           >
//             <option value="power1.inOut">power1.inOut</option>
//             <option value="power2.inOut">power2.inOut</option>
//             <option value="power3.inOut">power3.inOut</option>
//             <option value="power1.in">power1.in</option>
//             <option value="power2.in">power2.in</option>
//             <option value="power1.out">power1.out</option>
//             <option value="power2.out">power2.out</option>
//             <option value="sine.inOut">sine.inOut</option>
//             <option value="back.inOut">back.inOut</option>
//           </select>
//         </div>
      
//         <div className="mb-4">
//           <label className="block mb-2 text-teal-400">
//             Custom Cubic Bezier (x1, y1, x2, y2):
//           </label>
//           <input
//             type="text"
//             value={customBezier}
//             onChange={(e) => setCustomBezier(e.target.value)}
//             placeholder="0.25, 0.1, 0.25, 1"
//             className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
//           />
//         </div>
      
//         <div className="bg-gray-700 p-4 rounded font-mono text-teal-400">
//           <strong>GSAP Code:</strong><br />
//           {getGsapCode()}
//         </div>
//       </div>
    
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         <div className="bg-gray-800 rounded-lg p-5">
//           <div className="text-center mb-4 text-teal-400 font-bold">
//             Position Over Time (GSAP Style)
//           </div>
//           <canvas
//             ref={positionCanvasRef}
//             className="w-full max-w-md h-48 border border-gray-600 bg-gray-700 mx-auto block"
//           />
//         </div>
      
//         <div className="bg-gray-800 rounded-lg p-5">
//           <div className="text-center mb-4 text-teal-400 font-bold">
//             Speed Over Time (AE Style)
//           </div>
//           <canvas
//             ref={speedCanvasRef}
//             className="w-full max-w-md h-48 border border-gray-600 bg-gray-700 mx-auto block"
//           />
//         </div>
//       </div>
    
//       <div className="bg-gray-800 rounded-lg p-5 text-center">
//         <h3 className="text-xl mb-4">Live Demo</h3>
//         <div
//           ref={demoSquareRef}
//           className="w-12 h-12 bg-teal-400 mx-auto mb-5 rounded"
//         />
//         <button
//           onClick={runDemo}
//           className="bg-teal-400 text-gray-900 px-5 py-2 rounded font-bold hover:bg-teal-500 transition-colors"
//         >
//           Test Animation
//         </button>
//       </div>
//     </div>
//   );
// };


// export default GSAPSpeedVisualizer;


/// WITH INTERACTIVE CUSTOM EASE INPUT
// import React, { useState, useEffect, useRef } from 'react';


// const GSAPSpeedVisualizer = () => {
//   const [selectedEase, setSelectedEase] = useState('power1.inOut');
//   const [customBezier, setCustomBezier] = useState('');
//   const [customEasePath, setCustomEasePath] = useState('');
//   const positionCanvasRef = useRef(null);
//   const speedCanvasRef = useRef(null);
//   const demoSquareRef = useRef(null);


//   // Easing functions mapping
//   const easingFunctions = {
//     'power1.inOut': [0.42, 0, 0.58, 1],
//     'power2.inOut': [0.37, 0, 0.63, 1],
//     'power3.inOut': [0.32, 0, 0.67, 1],
//     'power1.in': [0.42, 0, 1, 1],
//     'power2.in': [0.55, 0.06, 0.68, 0.19],
//     'power1.out': [0, 0, 0.58, 1],
//     'power2.out': [0.25, 0.46, 0.45, 0.94],
//     'sine.inOut': [0.37, 0, 0.63, 1],
//     'back.inOut': [0.68, -0.6, 0.32, 1.6]
//   };


//   // Parse SVG path data for CustomEase
//   const parseSVGPath = (pathString) => {
//     if (!pathString.trim()) return null;
  
//     try {
//       // Clean the path string
//       const cleanPath = pathString.replace(/\s+/g, ' ').trim();
    
//       // Extract commands and coordinates
//       const commands = cleanPath.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g);
//       if (!commands) return null;
    
//       const points = [];
//       let currentX = 0, currentY = 0;
    
//       commands.forEach(command => {
//         const type = command[0];
//         const coords = command.slice(1).trim().split(/[\s,]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
      
//         if (type === 'M' && coords.length >= 2) {
//           currentX = coords[0];
//           currentY = coords[1];
//           points.push({ x: currentX, y: currentY, type: 'M' });
//         } else if (type === 'C' && coords.length >= 6) {
//           for (let i = 0; i < coords.length; i += 6) {
//             const cp1x = coords[i];
//             const cp1y = coords[i + 1];
//             const cp2x = coords[i + 2];
//             const cp2y = coords[i + 3];
//             const x = coords[i + 4];
//             const y = coords[i + 5];
          
//             points.push({
//               type: 'C',
//               cp1x, cp1y, cp2x, cp2y,
//               x, y,
//               startX: currentX, startY: currentY
//             });
          
//             currentX = x;
//             currentY = y;
//           }
//         }
//       });
    
//       return points;
//     } catch (error) {
//       console.error('Error parsing SVG path:', error);
//       return null;
//     }
//   };


//   // Evaluate custom ease at time t (0-1)
//   const evaluateCustomEase = (t, pathPoints) => {
//     if (!pathPoints || pathPoints.length === 0) return t;
  
//     // Find the cubic bezier segment for this t value
//     const cubicSegments = pathPoints.filter(p => p.type === 'C');
//     if (cubicSegments.length === 0) return t;
  
//     // For simplicity, use the first cubic segment
//     // In a full implementation, you'd interpolate between segments based on x values
//     const segment = cubicSegments[0];
  
//     // Normalize the bezier curve to 0-1 range
//     const startX = segment.startX;
//     const startY = segment.startY;
//     const endX = segment.x;
//     const endY = segment.y;
  
//     // Convert to normalized cubic bezier control points
//     const cp1x = (segment.cp1x - startX) / (endX - startX);
//     const cp1y = (segment.cp1y - startY) / (endY - startY);
//     const cp2x = (segment.cp2x - startX) / (endX - startX);
//     const cp2y = (segment.cp2y - startY) / (endY - startY);
  
//     return cubicBezierEase(t, cp1x, cp1y, cp2x, cp2y);
//   };


//   // Cubic bezier calculation
//   const cubicBezierEase = (t, x1, y1, x2, y2) => {
//     const cx = 3 * x1;
//     const bx = 3 * (x2 - x1) - cx;
//     const ax = 1 - cx - bx;
  
//     const cy = 3 * y1;
//     const by = 3 * (y2 - y1) - cy;
//     const ay = 1 - cy - by;
  
//     // Newton-Raphson method to find t for given x
//     let x = t;
//     for (let i = 0; i < 10; i++) {
//       const currentX = ((ax * x + bx) * x + cx) * x;
//       const currentSlope = (3 * ax * x + 2 * bx) * x + cx;
//       if (Math.abs(currentSlope) < 1e-6) break;
//       x = x - (currentX - t) / currentSlope;
//     }
  
//     return ((ay * x + by) * x + cy) * x;
//   };


//   const getEaseFunction = () => {
//     if (selectedEase === 'customEase' && customEasePath.trim()) {
//       const pathPoints = parseSVGPath(customEasePath);
//       if (pathPoints) {
//         return (t) => evaluateCustomEase(t, pathPoints);
//       }
//     }
  
//     if (customBezier.trim() && selectedEase !== 'customEase') {
//       const values = customBezier.split(',').map(v => parseFloat(v.trim()));
//       if (values.length === 4 && values.every(v => !isNaN(v))) {
//         return (t) => cubicBezierEase(t, ...values);
//       }
//     }
  
//     const bezierValues = easingFunctions[selectedEase] || easingFunctions['power1.inOut'];
//     return (t) => cubicBezierEase(t, ...bezierValues);
//   };


//   const drawPositionChart = () => {
//     const canvas = positionCanvasRef.current;
//     if (!canvas) return;
  
//     const ctx = canvas.getContext('2d');
//     const width = canvas.width = 400;
//     const height = canvas.height = 200;
  
//     ctx.clearRect(0, 0, width, height);
  
//     // Grid
//     ctx.strokeStyle = '#444';
//     ctx.lineWidth = 1;
//     for (let i = 0; i <= 10; i++) {
//       const x = (width / 10) * i;
//       const y = (height / 10) * i;
//       ctx.beginPath();
//       ctx.moveTo(x, 0);
//       ctx.lineTo(x, height);
//       ctx.stroke();
//       ctx.beginPath();
//       ctx.moveTo(0, y);
//       ctx.lineTo(width, y);
//       ctx.stroke();
//     }
  
//     // Curve
//     ctx.strokeStyle = '#00d4aa';
//     ctx.lineWidth = 3;
//     ctx.beginPath();
  
//     const easeFunction = getEaseFunction();
  
//     for (let i = 0; i <= 100; i++) {
//       const t = i / 100;
//       const progress = easeFunction(t);
//       const x = t * width;
//       const y = height - (Math.max(0, Math.min(1, progress)) * height);
    
//       if (i === 0) {
//         ctx.moveTo(x, y);
//       } else {
//         ctx.lineTo(x, y);
//       }
//     }
//     ctx.stroke();
//   };


//   const drawSpeedChart = () => {
//     const canvas = speedCanvasRef.current;
//     if (!canvas) return;
  
//     const ctx = canvas.getContext('2d');
//     const width = canvas.width = 400;
//     const height = canvas.height = 200;
  
//     ctx.clearRect(0, 0, width, height);
  
//     // Grid
//     ctx.strokeStyle = '#444';
//     ctx.lineWidth = 1;
//     for (let i = 0; i <= 10; i++) {
//       const x = (width / 10) * i;
//       const y = (height / 10) * i;
//       ctx.beginPath();
//       ctx.moveTo(x, 0);
//       ctx.lineTo(x, height);
//       ctx.stroke();
//       ctx.beginPath();
//       ctx.moveTo(0, y);
//       ctx.lineTo(width, y);
//       ctx.stroke();
//     }
  
//     // Calculate speed (derivative)
//     ctx.strokeStyle = '#ff6b6b';
//     ctx.lineWidth = 3;
//     ctx.beginPath();
  
//     const speeds = [];
//     const dt = 0.001;
//     const easeFunction = getEaseFunction();
  
//     for (let i = 0; i <= 100; i++) {
//       const t = i / 100;
//       const progress1 = easeFunction(Math.max(0, t - dt));
//       const progress2 = easeFunction(Math.min(1, t + dt));
//       const speed = (progress2 - progress1) / (2 * dt);
//       speeds.push(Math.abs(speed));
//     }
  
//     const maxSpeed = Math.max(...speeds) || 1;
  
//     for (let i = 0; i <= 100; i++) {
//       const t = i / 100;
//       const normalizedSpeed = speeds[i] / maxSpeed;
//       const x = t * width;
//       const y = height - (normalizedSpeed * height);
    
//       if (i === 0) {
//         ctx.moveTo(x, y);
//       } else {
//         ctx.lineTo(x, y);
//       }
//     }
//     ctx.stroke();
//   };


//   const drawCharts = () => {
//     drawPositionChart();
//     drawSpeedChart();
//   };


//   const runDemo = () => {
//     const square = demoSquareRef.current;
//     if (!square || !window.gsap) return;
  
//     let ease;
  
//     if (selectedEase === 'customEase' && customEasePath.trim()) {
//       // For GSAP CustomEase, we'd need the actual CustomEase plugin
//       // For demo purposes, we'll use a fallback
//       ease = 'power2.inOut';
//     } else if (customBezier.trim() && selectedEase !== 'customEase') {
//       const values = customBezier.split(',').map(v => parseFloat(v.trim()));
//       if (values.length === 4 && values.every(v => !isNaN(v))) {
//         ease = `cubic-bezier(${values.join(', ')})`;
//       } else {
//         ease = selectedEase;
//       }
//     } else {
//       ease = selectedEase;
//     }
  
//     window.gsap.fromTo(square,
//       { x: -100 },
//       {
//         x: 100,
//         duration: 2,
//         ease: ease,
//         yoyo: true,
//         repeat: 1
//       }
//     );
//   };


//   const getGsapCode = () => {
//     if (selectedEase === 'customEase' && customEasePath.trim()) {
//       return `ease: CustomEase.create("custom", "${customEasePath}")`;
//     }
  
//     if (customBezier.trim() && selectedEase !== 'customEase') {
//       const values = customBezier.split(',').map(v => parseFloat(v.trim()));
//       if (values.length === 4 && values.every(v => !isNaN(v))) {
//         return `ease: "cubic-bezier(${values.join(', ')})"`;
//       }
//     }
  
//     return `ease: "${selectedEase}"`;
//   };


//   useEffect(() => {
//     // Load GSAP
//     if (!window.gsap) {
//       const script = document.createElement('script');
//       script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
//       script.onload = () => {
//         drawCharts();
//       };
//       document.head.appendChild(script);
//     } else {
//       drawCharts();
//     }
//   }, [selectedEase, customBezier, customEasePath]);


//   return (
//     <div className="max-w-4xl mx-auto p-5 bg-gray-900 text-white min-h-screen">
//       <h1 className="text-center text-3xl font-bold mb-8 text-teal-400">
//         GSAP Speed Graph Visualizer
//       </h1>
    
//       <div className="bg-gray-800 rounded-lg p-5 mb-5">
//         <div className="mb-4">
//           <label htmlFor="easeSelect" className="block mb-2 text-teal-400">
//             Select Ease Type:
//           </label>
//           <select
//             id="easeSelect"
//             value={selectedEase}
//             onChange={(e) => setSelectedEase(e.target.value)}
//             className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
//           >
//             <option value="power1.inOut">power1.inOut</option>
//             <option value="power2.inOut">power2.inOut</option>
//             <option value="power3.inOut">power3.inOut</option>
//             <option value="power1.in">power1.in</option>
//             <option value="power2.in">power2.in</option>
//             <option value="power1.out">power1.out</option>
//             <option value="power2.out">power2.out</option>
//             <option value="sine.inOut">sine.inOut</option>
//             <option value="back.inOut">back.inOut</option>
//             <option value="customEase">CustomEase (SVG Path)</option>
//           </select>
//         </div>
      
//         {selectedEase === 'customEase' ? (
//           <div className="mb-4">
//             <label className="block mb-2 text-teal-400">
//               CustomEase SVG Path:
//             </label>
//             <input
//               type="text"
//               value={customEasePath}
//               onChange={(e) => setCustomEasePath(e.target.value)}
//               placeholder="M0,0 C0.18719,0.024 -0.68168,0.257 1,0.56"
//               className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded font-mono text-sm"
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Paste SVG path data from GSAP's CustomEase tool
//             </p>
//           </div>
//         ) : (
//           <div className="mb-4">
//             <label className="block mb-2 text-teal-400">
//               Custom Cubic Bezier (x1, y1, x2, y2):
//             </label>
//             <input
//               type="text"
//               value={customBezier}
//               onChange={(e) => setCustomBezier(e.target.value)}
//               placeholder="0.25, 0.1, 0.25, 1"
//               className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
//             />
//           </div>
//         )}
      
//         <div className="bg-gray-700 p-4 rounded font-mono text-teal-400 text-sm">
//           <strong>GSAP Code:</strong><br />
//           {getGsapCode()}
//         </div>
//       </div>
    
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         <div className="bg-gray-800 rounded-lg p-5">
//           <div className="text-center mb-4 text-teal-400 font-bold">
//             Position Over Time (GSAP Style)
//           </div>
//           <canvas
//             ref={positionCanvasRef}
//             className="w-full max-w-md h-48 border border-gray-600 bg-gray-700 mx-auto block"
//           />
//         </div>
      
//         <div className="bg-gray-800 rounded-lg p-5">
//           <div className="text-center mb-4 text-teal-400 font-bold">
//             Speed Over Time (AE Style)
//           </div>
//           <canvas
//             ref={speedCanvasRef}
//             className="w-full max-w-md h-48 border border-gray-600 bg-gray-700 mx-auto block"
//           />
//         </div>
//       </div>
    
//       <div className="bg-gray-800 rounded-lg p-5 text-center">
//         <h3 className="text-xl mb-4">Live Demo</h3>
//         <div
//           ref={demoSquareRef}
//           className="w-12 h-12 bg-teal-400 mx-auto mb-5 rounded"
//         />
//         <button
//           onClick={runDemo}
//           className="bg-teal-400 text-gray-900 px-5 py-2 rounded font-bold hover:bg-teal-500 transition-colors"
//         >
//           Test Animation
//         </button>
//         {selectedEase === 'customEase' && (
//           <p className="text-xs text-gray-400 mt-2">
//             Note: Demo uses fallback ease since CustomEase plugin isn't loaded
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };


// export default GSAPSpeedVisualizer;




import React, { useState, useEffect, useRef, useCallback } from 'react';


const GSAPSpeedVisualizer = () => {
 const [selectedEase, setSelectedEase] = useState('power1.inOut');
 const [customBezier, setCustomBezier] = useState('');
 const [customEasePath, setCustomEasePath] = useState('');
 const [interactivePoints, setInteractivePoints] = useState([
   { x: 0, y: 1 },
   { x: 0.3, y: 0.8 },
   { x: 0.7, y: 1.2 },
   { x: 1, y: 1 }
 ]);
 const [isDragging, setIsDragging] = useState(false);
 const [dragPointIndex, setDragPointIndex] = useState(-1);
  const positionCanvasRef = useRef(null);
 const speedCanvasRef = useRef(null);
 const demoSquareRef = useRef(null);


 // Easing functions mapping
 const easingFunctions = {
   'power1.inOut': [0.42, 0, 0.58, 1],
   'power2.inOut': [0.37, 0, 0.63, 1],
   'power3.inOut': [0.32, 0, 0.67, 1],
   'power1.in': [0.42, 0, 1, 1],
   'power2.in': [0.55, 0.06, 0.68, 0.19],
   'power1.out': [0, 0, 0.58, 1],
   'power2.out': [0.25, 0.46, 0.45, 0.94],
   'sine.inOut': [0.37, 0, 0.63, 1],
   'back.inOut': [0.68, -0.6, 0.32, 1.6]
 };


 // Convert interactive points to SVG path
 const pointsToSVGPath = useCallback((points) => {
   if (points.length < 4) return '';
  
   // Create a smooth curve through the points using cubic bezier
   let path = `M0,0 `;
  
   // Calculate control points for smooth curve
   for (let i = 0; i < points.length - 1; i++) {
     const current = points[i];
     const next = points[i + 1];
     const prev = i > 0 ? points[i - 1] : current;
     const nextNext = i < points.length - 2 ? points[i + 2] : next;
    
     // Calculate smooth control points
     const cp1x = current.x + (next.x - prev.x) * 0.2;
     const cp1y = current.y + (next.y - prev.y) * 0.2;
     const cp2x = next.x - (nextNext.x - current.x) * 0.2;
     const cp2y = next.y - (nextNext.y - current.y) * 0.2;
    
     path += `C${cp1x},${1 - cp1y} ${cp2x},${1 - cp2y} ${next.x},${1 - next.y} `;
   }
  
   return path.trim();
 }, []);


 // Parse SVG path data for CustomEase
 const parseSVGPath = (pathString) => {
   if (!pathString.trim()) return null;
  
   try {
     const cleanPath = pathString.replace(/\s+/g, ' ').trim();
     const commands = cleanPath.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g);
     if (!commands) return null;
    
     const points = [];
     let currentX = 0, currentY = 0;
    
     commands.forEach(command => {
       const type = command[0];
       const coords = command.slice(1).trim().split(/[\s,]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
      
       if (type === 'M' && coords.length >= 2) {
         currentX = coords[0];
         currentY = coords[1];
         points.push({ x: currentX, y: currentY, type: 'M' });
       } else if (type === 'C' && coords.length >= 6) {
         for (let i = 0; i < coords.length; i += 6) {
           const cp1x = coords[i];
           const cp1y = coords[i + 1];
           const cp2x = coords[i + 2];
           const cp2y = coords[i + 3];
           const x = coords[i + 4];
           const y = coords[i + 5];
          
           points.push({
             type: 'C',
             cp1x, cp1y, cp2x, cp2y,
             x, y,
             startX: currentX, startY: currentY
           });
          
           currentX = x;
           currentY = y;
         }
       }
     });
    
     return points;
   } catch (error) {
     console.error('Error parsing SVG path:', error);
     return null;
   }
 };


 // Evaluate custom ease at time t (0-1)
 const evaluateCustomEase = (t, pathPoints) => {
   if (!pathPoints || pathPoints.length === 0) return t;
  
   const cubicSegments = pathPoints.filter(p => p.type === 'C');
   if (cubicSegments.length === 0) return t;
  
   const segment = cubicSegments[0];
   const startX = segment.startX;
   const startY = segment.startY;
   const endX = segment.x;
   const endY = segment.y;
  
   const cp1x = (segment.cp1x - startX) / (endX - startX);
   const cp1y = (segment.cp1y - startY) / (endY - startY);
   const cp2x = (segment.cp2x - startX) / (endX - startX);
   const cp2y = (segment.cp2y - startY) / (endY - startY);
  
   return cubicBezierEase(t, cp1x, cp1y, cp2x, cp2y);
 };


 // Evaluate interactive points as speed curve
 const evaluateInteractiveSpeed = (t) => {
   if (interactivePoints.length < 2) return 1;
  
   // Find the two points that bracket t
   let leftPoint = interactivePoints[0];
   let rightPoint = interactivePoints[interactivePoints.length - 1];
  
   for (let i = 0; i < interactivePoints.length - 1; i++) {
     if (t >= interactivePoints[i].x && t <= interactivePoints[i + 1].x) {
       leftPoint = interactivePoints[i];
       rightPoint = interactivePoints[i + 1];
       break;
     }
   }
  
   // Linear interpolation between points
   if (rightPoint.x === leftPoint.x) return leftPoint.y;
   const ratio = (t - leftPoint.x) / (rightPoint.x - leftPoint.x);
   return leftPoint.y + (rightPoint.y - leftPoint.y) * ratio;
 };


 // Convert speed curve to position curve
 const speedToPosition = (speedFunc) => {
   return (t) => {
     const steps = 100;
     let position = 0;
     const dt = t / steps;
    
     for (let i = 0; i < steps; i++) {
       const time = i * dt;
       const speed = speedFunc(time);
       position += speed * dt;
     }
    
     return position;
   };
 };


 // Cubic bezier calculation
 const cubicBezierEase = (t, x1, y1, x2, y2) => {
   const cx = 3 * x1;
   const bx = 3 * (x2 - x1) - cx;
   const ax = 1 - cx - bx;
  
   const cy = 3 * y1;
   const by = 3 * (y2 - y1) - cy;
   const ay = 1 - cy - by;
  
   let x = t;
   for (let i = 0; i < 10; i++) {
     const currentX = ((ax * x + bx) * x + cx) * x;
     const currentSlope = (3 * ax * x + 2 * bx) * x + cx;
     if (Math.abs(currentSlope) < 1e-6) break;
     x = x - (currentX - t) / currentSlope;
   }
  
   return ((ay * x + by) * x + cy) * x;
 };


 const getEaseFunction = () => {
   if (selectedEase === 'interactive') {
     return speedToPosition(evaluateInteractiveSpeed);
   }
  
   if (selectedEase === 'customEase' && customEasePath.trim()) {
     const pathPoints = parseSVGPath(customEasePath);
     if (pathPoints) {
       return (t) => evaluateCustomEase(t, pathPoints);
     }
   }
  
   if (customBezier.trim() && selectedEase !== 'customEase' && selectedEase !== 'interactive') {
     const values = customBezier.split(',').map(v => parseFloat(v.trim()));
     if (values.length === 4 && values.every(v => !isNaN(v))) {
       return (t) => cubicBezierEase(t, ...values);
     }
   }
  
   const bezierValues = easingFunctions[selectedEase] || easingFunctions['power1.inOut'];
   return (t) => cubicBezierEase(t, ...bezierValues);
 };


 const drawPositionChart = () => {
   const canvas = positionCanvasRef.current;
   if (!canvas) return;
  
   const ctx = canvas.getContext('2d');
   const width = canvas.width = 400;
   const height = canvas.height = 200;
  
   ctx.clearRect(0, 0, width, height);
  
   // Grid
   ctx.strokeStyle = '#444';
   ctx.lineWidth = 1;
   for (let i = 0; i <= 10; i++) {
     const x = (width / 10) * i;
     const y = (height / 10) * i;
     ctx.beginPath();
     ctx.moveTo(x, 0);
     ctx.lineTo(x, height);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(0, y);
     ctx.lineTo(width, y);
     ctx.stroke();
   }
  
   // Curve
   ctx.strokeStyle = '#00d4aa';
   ctx.lineWidth = 3;
   ctx.beginPath();
  
   const easeFunction = getEaseFunction();
  
   for (let i = 0; i <= 100; i++) {
     const t = i / 100;
     const progress = easeFunction(t);
     const x = t * width;
     const y = height - (Math.max(0, Math.min(2, progress)) * height / 2);
    
     if (i === 0) {
       ctx.moveTo(x, y);
     } else {
       ctx.lineTo(x, y);
     }
   }
   ctx.stroke();
 };


 const drawSpeedChart = () => {
   const canvas = speedCanvasRef.current;
   if (!canvas) return;
  
   const ctx = canvas.getContext('2d');
   const width = canvas.width = 400;
   const height = canvas.height = 200;
  
   ctx.clearRect(0, 0, width, height);
  
   // Grid
   ctx.strokeStyle = '#444';
   ctx.lineWidth = 1;
   for (let i = 0; i <= 10; i++) {
     const x = (width / 10) * i;
     const y = (height / 10) * i;
     ctx.beginPath();
     ctx.moveTo(x, 0);
     ctx.lineTo(x, height);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(0, y);
     ctx.lineTo(width, y);
     ctx.stroke();
   }
  
   // Speed curve
   ctx.strokeStyle = '#ff6b6b';
   ctx.lineWidth = 3;
   ctx.beginPath();
  
   if (selectedEase === 'interactive') {
     // Draw the interactive curve
     for (let i = 0; i <= 100; i++) {
       const t = i / 100;
       const speed = evaluateInteractiveSpeed(t);
       const x = t * width;
       const y = height - (Math.max(0, Math.min(2, speed)) * height / 2);
      
       if (i === 0) {
         ctx.moveTo(x, y);
       } else {
         ctx.lineTo(x, y);
       }
     }
    
     // Draw control points
     ctx.strokeStyle = '#ffffff';
     ctx.fillStyle = '#ff6b6b';
     ctx.lineWidth = 2;
    
     interactivePoints.forEach((point, index) => {
       const x = point.x * width;
       const y = height - (Math.max(0, Math.min(2, point.y)) * height / 2);
      
       // Draw connecting lines
       if (index > 0) {
         const prevPoint = interactivePoints[index - 1];
         const prevX = prevPoint.x * width;
         const prevY = height - (Math.max(0, Math.min(2, prevPoint.y)) * height / 2);
        
         ctx.strokeStyle = '#666';
         ctx.beginPath();
         ctx.moveTo(prevX, prevY);
         ctx.lineTo(x, y);
         ctx.stroke();
       }
      
       // Draw control point
       ctx.fillStyle = isDragging && dragPointIndex === index ? '#ffff00' : '#ff6b6b';
       ctx.strokeStyle = '#ffffff';
       ctx.beginPath();
       ctx.arc(x, y, 6, 0, 2 * Math.PI);
       ctx.fill();
       ctx.stroke();
     });
   } else {
     // Calculate speed from other easing functions
     const speeds = [];
     const dt = 0.001;
     const easeFunction = getEaseFunction();
    
     for (let i = 0; i <= 100; i++) {
       const t = i / 100;
       const progress1 = easeFunction(Math.max(0, t - dt));
       const progress2 = easeFunction(Math.min(1, t + dt));
       const speed = (progress2 - progress1) / (2 * dt);
       speeds.push(Math.abs(speed));
     }
    
     const maxSpeed = Math.max(...speeds) || 1;
    
     for (let i = 0; i <= 100; i++) {
       const t = i / 100;
       const normalizedSpeed = speeds[i] / maxSpeed;
       const x = t * width;
       const y = height - (normalizedSpeed * height);
      
       if (i === 0) {
         ctx.moveTo(x, y);
       } else {
         ctx.lineTo(x, y);
       }
     }
   }
   ctx.stroke();
 };


 const handleSpeedCanvasMouseDown = (e) => {
   if (selectedEase !== 'interactive') return;
  
   const canvas = speedCanvasRef.current;
   const rect = canvas.getBoundingClientRect();
   const x = (e.clientX - rect.left) * (canvas.width / rect.width);
   const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  
   // Check if clicking on existing point
   const pointRadius = 10;
   for (let i = 0; i < interactivePoints.length; i++) {
     const point = interactivePoints[i];
     const pointX = point.x * canvas.width;
     const pointY = canvas.height - (Math.max(0, Math.min(2, point.y)) * canvas.height / 2);
    
     const distance = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2);
     if (distance <= pointRadius) {
       setIsDragging(true);
       setDragPointIndex(i);
       return;
     }
   }
  
   // Add new point
   const newX = x / canvas.width;
   const newY = 2 - (y / canvas.height * 2);
   const newPoint = { x: Math.max(0, Math.min(1, newX)), y: Math.max(0, Math.min(2, newY)) };
  
   const newPoints = [...interactivePoints, newPoint].sort((a, b) => a.x - b.x);
   setInteractivePoints(newPoints);
 };


 const handleSpeedCanvasMouseMove = (e) => {
   if (!isDragging || dragPointIndex === -1 || selectedEase !== 'interactive') return;
  
   const canvas = speedCanvasRef.current;
   const rect = canvas.getBoundingClientRect();
   const x = (e.clientX - rect.left) * (canvas.width / rect.width);
   const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  
   const newX = x / canvas.width;
   const newY = 2 - (y / canvas.height * 2);
  
   const newPoints = [...interactivePoints];
   newPoints[dragPointIndex] = {
     x: Math.max(0, Math.min(1, newX)),
     y: Math.max(0, Math.min(2, newY))
   };
  
   // Keep points sorted by x
   newPoints.sort((a, b) => a.x - b.x);
   setInteractivePoints(newPoints);
  
   // Update dragPointIndex after sorting
   const draggedPoint = newPoints.find(p =>
     Math.abs(p.x - Math.max(0, Math.min(1, newX))) < 0.001 &&
     Math.abs(p.y - Math.max(0, Math.min(2, newY))) < 0.001
   );
   setDragPointIndex(newPoints.indexOf(draggedPoint));
 };


 const handleSpeedCanvasMouseUp = () => {
   setIsDragging(false);
   setDragPointIndex(-1);
 };


 const drawCharts = () => {
   drawPositionChart();
   drawSpeedChart();
 };


 const runDemo = () => {
   const square = demoSquareRef.current;
   if (!square || !window.gsap) return;
  
   let ease;
  
   if (selectedEase === 'interactive') {
     // Convert to CustomEase path
     const svgPath = pointsToSVGPath(interactivePoints);
     ease = 'power2.inOut'; // Fallback for demo
   } else if (selectedEase === 'customEase' && customEasePath.trim()) {
     ease = 'power2.inOut';
   } else if (customBezier.trim() && selectedEase !== 'customEase' && selectedEase !== 'interactive') {
     const values = customBezier.split(',').map(v => parseFloat(v.trim()));
     if (values.length === 4 && values.every(v => !isNaN(v))) {
       ease = `cubic-bezier(${values.join(', ')})`;
     } else {
       ease = selectedEase;
     }
   } else {
     ease = selectedEase;
   }
  
   window.gsap.fromTo(square,
     { x: -100 },
     {
       x: 100,
       duration: 2,
       ease: ease,
       yoyo: true,
       repeat: 1
     }
   );
 };


 const getGsapCode = () => {
   if (selectedEase === 'interactive') {
     const svgPath = pointsToSVGPath(interactivePoints);
     return `ease: CustomEase.create("custom", "${svgPath}")`;
   }
  
   if (selectedEase === 'customEase' && customEasePath.trim()) {
     return `ease: CustomEase.create("custom", "${customEasePath}")`;
   }
  
   if (customBezier.trim() && selectedEase !== 'customEase' && selectedEase !== 'interactive') {
     const values = customBezier.split(',').map(v => parseFloat(v.trim()));
     if (values.length === 4 && values.every(v => !isNaN(v))) {
       return `ease: "cubic-bezier(${values.join(', ')})"`;
     }
   }
  
   return `ease: "${selectedEase}"`;
 };


 const resetInteractivePoints = () => {
   setInteractivePoints([
     { x: 0, y: 1 },
     { x: 0.3, y: 0.8 },
     { x: 0.7, y: 1.2 },
     { x: 1, y: 1 }
   ]);
 };


 useEffect(() => {
   // Update customEasePath when interactive points change
   if (selectedEase === 'interactive') {
     const svgPath = pointsToSVGPath(interactivePoints);
     setCustomEasePath(svgPath);
   }
 }, [interactivePoints, selectedEase, pointsToSVGPath]);


 useEffect(() => {
   if (!window.gsap) {
     const script = document.createElement('script');
     script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
     script.onload = () => {
       drawCharts();
     };
     document.head.appendChild(script);
   } else {
     drawCharts();
   }
 }, [selectedEase, customBezier, customEasePath, interactivePoints]);


 return (
   <div className="max-w-4xl mx-auto p-5 bg-gray-900 text-white min-h-screen">
     <h1 className="text-center text-3xl font-bold mb-8 text-teal-400">
       GSAP Speed Graph Visualizer
     </h1>
    
     <div className="bg-gray-800 rounded-lg p-5 mb-5">
       <div className="mb-4">
         <label htmlFor="easeSelect" className="block mb-2 text-teal-400">
           Select Ease Type:
         </label>
         <select
           id="easeSelect"
           value={selectedEase}
           onChange={(e) => setSelectedEase(e.target.value)}
           className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
         >
           <option value="power1.inOut">power1.inOut</option>
           <option value="power2.inOut">power2.inOut</option>
           <option value="power3.inOut">power3.inOut</option>
           <option value="power1.in">power1.in</option>
           <option value="power2.in">power2.in</option>
           <option value="power1.out">power1.out</option>
           <option value="power2.out">power2.out</option>
           <option value="sine.inOut">sine.inOut</option>
           <option value="back.inOut">back.inOut</option>
           <option value="customEase">CustomEase (SVG Path)</option>
           <option value="interactive">🎨 Interactive Speed Editor</option>
         </select>
       </div>
      
       {selectedEase === 'interactive' && (
         <div className="mb-4 p-4 bg-gray-700 rounded">
           <div className="flex items-center justify-between mb-2">
             <span className="text-teal-400 font-bold">Interactive Speed Editor</span>
             <button
               onClick={resetInteractivePoints}
               className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
             >
               Reset
             </button>
           </div>
           <p className="text-sm text-gray-300 mb-2">
             Click on the speed graph to add control points. Drag existing points to modify the curve.
           </p>
         </div>
       )}
      
       {selectedEase === 'customEase' && (
         <div className="mb-4">
           <label className="block mb-2 text-teal-400">
             CustomEase SVG Path:
           </label>
           <input
             type="text"
             value={customEasePath}
             onChange={(e) => setCustomEasePath(e.target.value)}
             placeholder="M0,0 C0.18719,0.024 -0.68168,0.257 1,0.56"
             className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded font-mono text-sm"
           />
           <p className="text-xs text-gray-400 mt-1">
             Paste SVG path data from GSAP's CustomEase tool
           </p>
         </div>
       )}
      
       {selectedEase !== 'customEase' && selectedEase !== 'interactive' && (
         <div className="mb-4">
           <label className="block mb-2 text-teal-400">
             Custom Cubic Bezier (x1, y1, x2, y2):
           </label>
           <input
             type="text"
             value={customBezier}
             onChange={(e) => setCustomBezier(e.target.value)}
             placeholder="0.25, 0.1, 0.25, 1"
             className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
           />
         </div>
       )}
      
       <div className="bg-gray-700 p-4 rounded font-mono text-teal-400 text-sm">
         <strong>GSAP Code:</strong><br />
         <span className="break-all">{getGsapCode()}</span>
       </div>
     </div>
    
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
       <div className="bg-gray-800 rounded-lg p-5">
         <div className="text-center mb-4 text-teal-400 font-bold">
           Position Over Time (GSAP Style)
         </div>
         <canvas
           ref={positionCanvasRef}
           className="w-full max-w-md h-48 border border-gray-600 bg-gray-700 mx-auto block"
         />
       </div>
      
       <div className="bg-gray-800 rounded-lg p-5">
         <div className="text-center mb-4 text-teal-400 font-bold">
           Speed Over Time (AE Style)
           {selectedEase === 'interactive' && <span className="text-xs block text-gray-400">Click to add points, drag to edit</span>}
         </div>
         <canvas
           ref={speedCanvasRef}
           className={`w-full max-w-md h-48 border border-gray-600 bg-gray-700 mx-auto block ${
             selectedEase === 'interactive' ? 'cursor-crosshair' : ''
           }`}
           onMouseDown={handleSpeedCanvasMouseDown}
           onMouseMove={handleSpeedCanvasMouseMove}
           onMouseUp={handleSpeedCanvasMouseUp}
           onMouseLeave={handleSpeedCanvasMouseUp}
         />
       </div>
     </div>
    
     <div className="bg-gray-800 rounded-lg p-5 text-center">
       <h3 className="text-xl mb-4">Live Demo</h3>
       <div
         ref={demoSquareRef}
         className="w-12 h-12 bg-teal-400 mx-auto mb-5 rounded"
       />
       <button
         onClick={runDemo}
         className="bg-teal-400 text-gray-900 px-5 py-2 rounded font-bold hover:bg-teal-500 transition-colors"
       >
         Test Animation
       </button>
       {(selectedEase === 'customEase' || selectedEase === 'interactive') && (
         <p className="text-xs text-gray-400 mt-2">
           Note: Demo uses fallback ease since CustomEase plugin isn't loaded
         </p>
       )}
     </div>
   </div>
 );
};


export default GSAPSpeedVisualizer;

