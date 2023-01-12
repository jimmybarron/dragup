import "./Instructions.css";
import { motion } from "framer-motion";

const Instructions = () => {
  return (
    <motion.div
      className="instructions"
      transition={{
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.2],
      }}
      exit={{
        opacity: 0,
        y: 20,
      }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          times: [0, 0.2],
          repeat: Infinity,
          repeatDelay: 0,
        }}
      >
        ↑
        <br />
      </motion.div>
      <div>
        Drag up
        <br />
        on a number to start...
      </div>
    </motion.div>
  );
};

export default Instructions;
