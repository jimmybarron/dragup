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
    // console.log(
    //   (props.totalSeconds - props.secondsRemaining) / props.totalSeconds
    // );
    console.log(((100 - props.progressMeter) / 100) * 4);
    const moonZ = ((100 - props.progressMeter) / 100) * 4;
    switch (mode) {
      case "zero":
        return [0, 3, 0];
      case "count":
        return [0, -0.7, moonZ];
    }
    return [0, 1, 0];
  };

  const moonAnim = useSpring({
    config: {
      mass: 0.3,
    },
    // position: props.mode === "count" ? [0, 1, 0] : [0, 3, 0],
    position: moonPosition(props),
    scale: props.mode === "count" ? [3, 3, 3] : [0, 0, 0],
  });

  // console.log(props.isCountdownDone)

  return (
    <a.mesh
      position={moonAnim.position}
      scale={moonAnim.scale}
      // animate={mode}
      // variants={{
      //   zero: {
      //     opacity: 0,
      //     x: 0,
      //     y: -2,
      //     z: 0,
      //     scale: 1,
      //     rotateX: -10,
      //   },
      //   delay: {
      //     opacity: 1,
      //   },
      //   count: {
      //     y: 2,
      //     rotateY: 20,
      //     scale: 10,
      //     transition: {
      //       scale: {
      //         duration: 2,
      //       },
      //     },
      //   },
      // }}
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
        <motion3d.pointLight
          position={[0, 1, 10]}
          intensity={1}
          // animate={props.mode}
          variants={{
            zero: {
              intensity: 0,
            },
            edit: {
              intensity: 0.5,
              transition: {
                duration: 4,
              },
            },
            count: {
              intensity: 1,
              y: 20,
              transition: {
                duration: 4,
                ease: "linear",
                repeat: Infinity,
              },
            },
          }}
        />
        {/* <Floor position={[0, 0, 0]} /> */}
      </Suspense>
    </>
  );
};

const AnimatedBg = (props) => {
  return (
    <Canvas {...props} className="animatedBg" style={{ position: "absolute" }}>
      <Scene {...props} />
      <OrbitControls enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};

export default AnimatedBg;
