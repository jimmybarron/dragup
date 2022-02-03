import { React, useState, useEffect } from "react";
import { motion } from "framer-motion-3d";
import { Canvas } from "react-three-fiber";
import "./AnimatedBg.css";

const Cube = (props) => {
  return (
    <motion.mesh
      position={[0, -2, 0]}
      animate={{ rotateY: props.progressMeter * 0.01 }}
    >
      <sphereBufferGeometry attach="geometry" args={[4, 4, 4]} />
      <meshStandardMaterial attach="material" color="white" />
    </motion.mesh>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[1, 1, 4]} intensity={1} />
      <Cube />
    </>
  );
};

const AnimatedBg = (props) => {
  return (
    <Canvas className="animatedBg" style={{ position: "absolute" }}>
      <Scene />
    </Canvas>
  );
};

export default AnimatedBg;
