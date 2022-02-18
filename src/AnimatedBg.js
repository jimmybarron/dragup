import { useRef, Suspense } from "react";
import { Canvas, useLoader, useFrame } from "react-three-fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";
import { useControls } from "leva";
import "./AnimatedBg.css";
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
  useFrame(({ clock }) => {
    if (mode === "count") {
      progressBox.current.rotation.y = clock.getElapsedTime();
    }
    // progressBox.current.scale.y = progressMeter / 100;
  });
  const progressBox = useRef();
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  const spinnerAnim = {
    count: {
      transition: {
        duration: 2,
        repeat: Infinity,
      },
      rotateY: 1,
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

const Model = ({ mode, ...props }) => {
  // const { vec3, size } = useControls({
  //   vec3: [0, -2, 3.6],
  //   size: {
  //     value: 0.4,
  //     min: 0,
  //     max: 10,
  //     step: 0.1,
  //   },
  // });

  const variants = {
    zero: {
      opacity: 0,
      x: 0,
      y: -2,
      z: 0,
      scale: [1, 1, 1],
    },
    count: {
      opacity: 1,
      y: 2,
      scale: [4, 4, 4],
    },
  };

  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/animated_moon/scene.gltf");
  const { nodes, materials } = useGLTF("/animated_moon/scene.gltf");

  useGLTF.preload("/scene.gltf");

  return (
    <group
      // position={vec3}
      {...props}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group name="8k_moon_2" rotation={[-Math.PI, 0, -Math.PI]}>
            <motion.mesh
              variants={{
                zero: {
                  opacity: 0,
                  x: 0,
                  y: -2,
                  z: 0,
                  scale: 1,
                  rotateX: -10,
                  transition: {
                    duration: 1,
                  },
                },
                delay: {
                  opacity: 1,
                },
                count: {
                  y: 2,
                  rotateY: 20,
                  scale: 4,
                },
              }}
              initial="zero"
              animate={mode}
              transition={{
                ease: "easeOut",
                duration: 5,
              }}
              dispose={null}
              ref={ref}
              object={gltf.scene}
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials["8k_moon"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

const Scene = (props) => {
  // const { intense } = useControls({
  //   intense: {
  //     value: 0.3,
  //     step: 0.1,
  //   },
  // });

  return (
    <>
      <Suspense fallback={null}>
        {/* <Spinner {...props} scale={[1, 1, 1]} position={[0, 1, 0]} /> */}
        <Model {...props} />
        <pointLight position={[0, -1, 0.6]} intensity={0.3} />
        <Floor position={[0, 0, 0]} />
      </Suspense>
    </>
  );
};

const AnimatedBg = (props) => {
  return (
    <Canvas className="animatedBg" style={{ position: "absolute" }}>
      <Scene {...props} />
      <OrbitControls enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};

export default AnimatedBg;
