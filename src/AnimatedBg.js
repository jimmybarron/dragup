import "./AnimatedBg.css";
import { useRef, Suspense } from "react";
import { motion } from "framer-motion-3d";
import { Canvas, useLoader, useLoaderoooooo } from "react-three-fiber";
import { TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import imageUrl from "./swirl.jpg";

const Floor = () => {
  return (
    <motion.mesh
      receiveShadow={true}
      position={[0, -1.5, 0]}
      rotation={[-1.2, 0, 0]}
    >
      <planeBufferGeometry attach="geometry" args={[3.1, 3.1]} />
      <meshStandardMaterial attach="material" color="#fff" />
    </motion.mesh>
  );
};

const Spinner = ({ progressMeter, mode, totalSeconds, ...props }) => {
  const progressBox = useRef();
  const texture = useLoader(TextureLoader, imageUrl);
  // useFrame(({ clock }) => {
  //   if (mode === "count") {
  //     progressBox.current.rotation.y = clock.getElapsedTime();
  //   }
  //   // progressBox.current.scale.y = progressMeter / 100;
  // });

  const spinnerAnim = {
    count: {
      transition: {
        duration: 2,
        repeat: Infinity,
      },
      rotateY: 4,
      opacity: 1,
    },
    zero: {
      transition: {
        duration: 2,
        repeat: Infinity,
      },
      rotateY: 0,
      opacity: 0,
    },
  };

  return (
    <motion.mesh
      ref={progressBox}
      castShadow={true}
      receiveShadow={true}
      initial={{ opacity: 0 }}
      variants={spinnerAnim}
      animate={mode}
      {...props}
    >
      <icosahedronGeometry attach="geometry" args={[1, 0]} />
      <meshPhysicalMaterial
        attach="material"
        // map={texture}
        roughness={1}
        metalness={1.5}
        color="white"
      />
    </motion.mesh>
  );
};

const Scene = ({ ...props }) => {
  const { vec3, intense } = useControls({
    vec3: [0, -1, 0.6],
    intense: {
      value: 0.7,
      step: 0.1,
    },
  });

  return (
    <>
      <Suspense fallback={null}>
        <Spinner {...props} scale={[1, 1, 1]} position={[0, 1, 0]} />
      </Suspense>
      <pointLight castShadow={true} position={vec3} intensity={intense} />
      <Floor position={[0, 0, 0]} />
    </>
  );
};

const AnimatedBg = (props) => {
  return (
    <Canvas shadowMap className="animatedBg" style={{ position: "absolute" }}>
      <Scene {...props} />
      <OrbitControls enableZoom={true} enableRotate={false} />
    </Canvas>
  );
};

export default AnimatedBg;
