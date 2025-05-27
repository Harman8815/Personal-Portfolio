import React, { useRef, useState } from 'react'
import { RoundedBox, Text } from '@react-three/drei'
import { a, useSpring, useSpringValue } from '@react-spring/three'

export default function Boxer(props) {
  const [interacting, setInteracting] = useState(false)

  // Infinite color transition using useSpringValue loop
  const color = useSpringValue('orange', {
    loop: { reverse: true },
    from: { color: 'orange' },
    to: { color: 'hotpink' },
    config: { duration: 500 },
  })

  // Rotation: rotates when pressed, resets on release
  const { rotation } = useSpring({
    rotation: interacting ? [Math.PI / 2, Math.PI / 2, 0] : [0, 0, 0],
    config: { mass: 5, tension: 180, friction: 2 },
  })

  // Position and rotation for each face (6 total)
  const faceConfigs = [
    { position: [0, 0, 1.01], rotation: [0, 0, 0] }, // Front
    { position: [0, 0, -1.01], rotation: [0, Math.PI, 0] }, // Back
    { position: [0, 1.01, 0], rotation: [-Math.PI / 2, 0, 0] }, // Top
    { position: [0, -1.01, 0], rotation: [Math.PI / 2, 0, 0] }, // Bottom
    { position: [1.01, 0, 0], rotation: [0, Math.PI / 2, 0] }, // Right
    { position: [-1.01, 0, 0], rotation: [0, Math.PI / 2, 0] }, // Left
  ]

  return (
    <a.group
      rotation={rotation}
      onPointerDown={() => setInteracting(true)}
      onPointerUp={() => setInteracting(false)}
      {...props}
    >
      <RoundedBox
        args={[2, 2, 2]}
        radius={0.2}
        smoothness={6}
      >
        <a.meshStandardMaterial attach="material" color={color} />
      </RoundedBox>

      {/* Add text to all 6 faces */}
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
  )
}
