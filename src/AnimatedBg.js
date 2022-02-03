import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion-3d";
import { Canvas, useFrame } from "react-three-fiber";
import "./AnimatedBg.css";

const Cube = ({ progressMeter, ...props }) => {
  const progressBox = useRef();

  useFrame(({ clock }) => {
    progressBox.current.rotation.y = clock.getElapsedTime();
    progressBox.current.scale.y = progressMeter / 100;
  });

  return (
    <mesh ref={progressBox} {...props}>
      <boxBufferGeometry attach="geometry" args={[1, 3, 1]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
};

const Scene = (props) => {
  return (
    <>
      <pointLight position={[1, 5, 5]} intensity={0.3} />
      <Cube {...props} scale={[1, 1, 1]} position={[0, 1, 0]} />
    </>
  );
};

const AnimatedBg = (props) => {
  return (
    <Canvas className="animatedBg" style={{ position: "absolute" }}>
      <Scene {...props} />
    </Canvas>
  );
};

export default AnimatedBg;
