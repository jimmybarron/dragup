import { React, useState, useEffect } from "react";
import { motion } from "framer-motion-3d";
import { Canvas } from "react-three-fiber";
import "./AnimatedBg.css";

const Cube = ({ progressMeter, ...props }) => {
  return (
    <motion.mesh {...props} animate={{ rotateY: progressMeter * 0.1 }}>
      <boxBufferGeometry attach="geometry" args={[1, 3, 1]} />
      <meshStandardMaterial attach="material" color="white" />
    </motion.mesh>
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
