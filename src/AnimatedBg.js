import { useRef, Suspense } from "react";
import { Canvas, useLoader, useFrame } from "react-three-fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";
import { motion as motion3d } from "framer-motion-3d";
import { Transition } from "framer-motion";
import { useControls } from "leva";
import "./AnimatedBg.css";
import imageUrl from "./swirl.jpg";
import { useSpring, a, config } from "@react-spring/three";
import { useEffect } from "react/cjs/react.production.min";

const Floor = () => {
  return (
    <motion3d.mesh
      receiveShadow={true}
      position={[0, -1.5, 0]}
      rotation={[-1.2, 0, 0]}
    >
      <planeBufferGeometry attach="geometry" args={[3.1, 3.1]} />
      <meshStandardMaterial attach="material" color="#fff" />
    </motion3d.mesh>
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
    <motion3d.mesh
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
        map={texture}
        roughness={1}
        metalness={1.5}
        color="white"
      />
    </motion3d.mesh>
  );
};

const Model = (props) => {
  // const { vec3, size } = useControls({
  //   vec3: [0, -2, 3.6],
  //   size: {
  //     value: 0.4,
  //     min: 0,
  //     max: 10,
  //     step: 0.1,
  //   },
  // });

  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/animated_moon/scene.gltf");
  const { nodes, materials } = useGLTF("/animated_moon/scene.gltf");

  useGLTF.preload("/scene.gltf");

  const moonPosition = ({ mode, ...props }) => {
    const moonZPos = ((100 - props.progressMeter) / 100) * 4;
    const moonYPos = -((100 - props.progressMeter) / 100) / 4;
    switch (mode) {
      case "count":
        return [0, moonYPos, moonZPos];
      default:
        return [0, 1, 0];
    }
  };

  const moonAnim = useSpring({
    config: {
      mass: 1,
      tension: 170,
      friction: 100,
    },
    position: moonPosition(props),
    scale:
      props.mode === "count"
        ? [1.8, 1.8, 1.8]
        : props.mode === "zero"
        ? [1.8, 1.8, 1.8]
        : [0, 0, 0],
  });

  // Add rotation to moon
  // useFrame(({ clock }) => {
  //   const a = clock.getElapsedTime();
  //   myMesh.current.rotation.x = a;
  // });

  return (
    <a.mesh
      position={moonAnim.position}
      scale={moonAnim.scale}
      dispose={null}
      ref={ref}
      object={gltf.scene}
      geometry={nodes.Object_4.geometry}
      material={materials["8k_moon"]}
      castShadow
      receiveShadow
    />
  );
};

const MoonLight = (props) => {
  const rangeScale = (number, inMin, inMax, outMin, outMax) => {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  const lightPosition = (props) => {
    if (props.mode === "count") {
      // Last two arguements passed to rangeScale will adjust the z position in space
      return [0, 10, rangeScale(props.progressMeter, 0, 100, -20, 100)];
    }
    return [0, 10, -100];
  };

  const lightAnim = useSpring({
    config: {
      duration: 1000,
    },
    position: lightPosition(props),
    intensity: props.mode === "count" ? 1 : 0,
  });

  const lightRef = useRef();

  return (
    <a.pointLight
      ref={lightRef}
      position={lightAnim.position}
      intensity={lightAnim.intensity}
    />
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
        <Model {...props} />
        <MoonLight {...props} />
      </Suspense>
    </>
  );
};

const AnimatedBg = (props) => {
  return (
    <Canvas {...props} className="animatedBg" style={{ position: "absolute" }}>
      <Scene {...props} />
      {/* <OrbitControls enableZoom={true} enableRotate={true} /> */}
    </Canvas>
  );
};

export default AnimatedBg;
