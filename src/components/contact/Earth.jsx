import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const Earth = () => {
  const earth = useGLTF("./models/planet/scene.gltf");
  const earthRef = useRef();

  // Rotate the Earth in all directions
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.x += 0.01; // Rotate on X-axis
      earthRef.current.rotation.y += 0.01; // Rotate on Y-axis
      earthRef.current.rotation.z += 0.01; // Rotate on Z-axis
    }
  });

  return <primitive ref={earthRef} object={earth.scene} scale={3.5} position-y={0} />;
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
