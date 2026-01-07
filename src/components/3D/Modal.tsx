// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   OrbitControls,
//   PivotControls,
//   useGLTF,
//   Wireframe,
// } from "@react-three/drei";
// import * as THREE from "three";
// import { useEffect, useRef, useState } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// // import { useState } from 'react'

// export function Model() {
//   const model = useGLTF("/b2.glb");
//   const { scene } = model;
//   console.log(model);
//   const meshesRef = useRef({});
//   const transformedOnceRef = useRef(false); // Flag to ensure transformations happen only once

//   useEffect(() => {
//     const meshes = {};

//     // Traverse the model to get the meshes
//     model.scene.traverse((child) => {
//       if (child.isMesh) {
//         meshes[child.name] = child;
//         child.material.wireframe = false; // Optional
//       }
//     });

//     meshesRef.current = meshes;

//     // Apply transformations only if not done already
//     if (!transformedOnceRef.current && meshes.l && meshes.r) {
//       const leftGeometry = meshes.l.geometry;
//       const rightGeometry = meshes.r.geometry;

//       // Apply transformations to geometry
//       leftGeometry.translate(-0.02, -0.08, 0);
//       rightGeometry.translate(-0.02, -0.08, 0);

//       const angleInRadians = THREE.MathUtils.degToRad(18);
//       leftGeometry.rotateX(angleInRadians);
//       rightGeometry.rotateX(angleInRadians);

//       // Set mesh positions
//       meshes.l.position.set(0.01, 0, 0.09);
//       meshes.r.position.set(-0.01, 0, 0.09);

//       // Mark transformations as applied
//       transformedOnceRef.current = true;
//       console.log("Transformations applied once");
//     }
//   }, [model]);

//   // meshes.RootNode.visible=false //working
//   // meshes.Scene.visible=false
//   // meshes.Sketchfab_model.visible=false //working
//   // meshes.book_texturing_v2_book.visible=false //working
//   // meshes.book_texturing_v2_pages.visible=false
//   // meshes.l.visible=false //w
//   // meshes.r.visible=false //w

//   // const [isExpanded, setIsExpanded] = useState(false)
//   // const lRotation = isExpanded ? 0 : -10
//   // const rRotation = isExpanded ? 0 : 10
//   // model.nodes.left_.visible=false
//   // model.nodes.right_.visible=false
//   // scene.scale.set(5, 5, 5)
//   // meshes.l.rotation.set(
//   //   THREE.MathUtils.degToRad(110), // x
//   //   THREE.MathUtils.degToRad(0), // y
//   //   THREE.MathUtils.degToRad(0) // z
//   // );
//   // meshes.r.rotation.set(
//   //   THREE.MathUtils.degToRad(-70), // x
//   //   THREE.MathUtils.degToRad(0), // y
//   //   THREE.MathUtils.degToRad(0) // z
//   // );
//   // meshes.l.position.set(0.01, 0, 0.09);
//   // meshes.r.position.set(-0.01, 0, 0.09);
//   // meshes.l.geometry.translate(-0.02, -0.08, 0);
//   // meshes.r.geometry.translate(-0.02, -0.08, 0);
//   // // meshes.l.geometry.rotatex(0, -0.05, 0);
//   // // meshes.l.visible=false
//   // const angleInRadians = THREE.MathUtils.degToRad(18);
//   // meshes.l.geometry.rotateX(angleInRadians);
//   // meshes.r.geometry.rotateX(angleInRadians);
//   const [isOpen, setIsOpen] = useState(false);
//   const rotate = isOpen? 0:-63

//   // useFrame(() => {
//   //   meshesRef.current.r.rotation.z =THREE.MathUtils.degToRad(leftRotate)
//   //   meshesRef.current.l.rotation.z =THREE.MathUtils.degToRad(leftRotate)
//   //   // meshes.l.rotation.z +=THREE.MathUtils.degToRad(1)
//   // });
 
//   useGSAP(() => {
//     if (meshesRef.current.l && meshesRef.current.r) {
//       gsap.to([meshesRef.current.l.rotation, meshesRef.current.r.rotation], {
//         z: THREE.MathUtils.degToRad(rotate),
//         duration: 1,
//         ease: "power2.out"
//       });
//     }
//   }, [isOpen]);
//   // const rightRotate = isOpen? '0':'-45'



//   // useGSAP(() => {
//   //   if (meshesRef.current.l && meshesRef.current.r) {
//   //     const leftMesh = meshesRef.current.l;
//   //     const rightMesh = meshesRef.current.r;

//   //     if (isOpen) {
//   //       // Open book effect
//   //       gsap.to(leftMesh.rotation, {
//   //         z: -Math.PI / 2,
//   //         duration: 1,
//   //         ease: "power2.out",
//   //       });
//   //       gsap.to(rightMesh.rotation, {
//   //         z: Math.PI / 2,
//   //         duration: 1,
//   //         ease: "power2.out",
//   //       });
//   //     } else {
//   //       // Close book effect
//   //       gsap.to(leftMesh.rotation, { z: 0, duration: 1, ease: "power2.out" });
//   //       gsap.to(rightMesh.rotation, { z: 0, duration: 1, ease: "power2.out" });
//   //     }
//   //   }
//   // }, [isOpen]);


//   // scene.scale.x = 0.2

//   return (
//     <>
//       {/* <PivotControls rotation={[0, 10, 0]}>
//         <primitive
//           object={model.nodes.l}
//           // onClick={() => setIsExpanded(!isExpanded)}
//         />
//       </PivotControls> */}
//       {/* <PivotControls>
//         <primitive
//           object={meshes.r}
//           // onClick={() => setIsExpanded(!isExpanded)}
//         />
//       </PivotControls> */}
//       <group position={[0,0,0]}>
//         <primitive
//           object={scene}
//           onClick={() => setIsOpen(!isOpen)}
//         />
//       </group>
//     </>
//   );
// }

// function Scene() {
//   return (
//     <>
//       <Model />
//       <Pages/>
//       <OrbitControls />
//     </>
//   );
// }

// export default function ThreeScene() {
//   return (
//     <Canvas
//       camera={{ position: [1, 2, 5], fov: 10 }}
//       style={{ width: "100%", height: "100vh" }}
//       className="bg-black"
//     >
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[10, 10, 5]} intensity={1} />
//       <axesHelper args={[5]} />
//       <Scene />
//     </Canvas>
//   );
// }


// function Pages(){
//   const model = useGLTF("/pages.glb")
//   const {scene} = model;
//   const meshes = {}
//   model.scene.traverse((e)=>{
//     meshes[e.name]=e;
//   })
//   console.log('pages', meshes);
  
//   const helperAxis = new THREE.AxesHelper(0.2);

//   meshes.book_texturing_v2_pages.add(helperAxis)
  
//   return(
//   <>
//   <primitive object={scene}/>
//   </>

//   )
// }
