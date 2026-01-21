"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import { a } from "@react-spring/three";

export default function Boxer({ position, scale = 1, rotation, tilt }) {
  const [interacting, setInteracting] = useState(false);
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && tilt) {
      meshRef.current.rotation.x = -tilt.y * (Math.PI / 180);
      meshRef.current.rotation.y = tilt.x * (Math.PI / 180);
    }
  });

  const faceConfigs = [
    { position: [0, 0, 1.01], rotation: [0, 0, 0] }, // Front
    { position: [0, 0, -1.01], rotation: [0, Math.PI, 0] }, // Back
    { position: [0, 1.01, 0], rotation: [-Math.PI / 2, 0, 0] }, // Top
    { position: [0, -1.01, 0], rotation: [Math.PI / 2, 0, 0] }, // Bottom
    { position: [1.01, 0, 0], rotation: [0, Math.PI / 2, 0] }, // Right
    { position: [-1.01, 0, 0], rotation: [0, -Math.PI / 2, 0] }, // Left
  ];

  return (
    <a.group
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerDown={() => setInteracting(true)}
      onPointerUp={() => setInteracting(false)}
    >
      <RoundedBox args={[2, 2, 2]} radius={0.2} smoothness={6}>
        <a.meshStandardMaterial attach="material" color="orange" />
      </RoundedBox>

      {faceConfigs.map((cfg, i) => (
        <Text
          key={i}
          position={cfg.position}
          rotation={cfg.rotation}
          fontSize={0.3}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          About Me
        </Text>
      ))}
    </a.group>
  );
}
