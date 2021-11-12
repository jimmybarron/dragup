import React from 'react'
import './Slider.css';
import { motion } from 'framer-motion'

const variants = {
    getBig: {
        scale: 0.9
    }
}

const Slider = React.forwardRef((props, constraintsRef) => {
    return (
        <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.01}
            dragSnapToOrigin={true}
            dragTransition={{ type: "spring", duration: "0.2", bounce: "0.4" }}
            className="button"
            variants={variants}
            whileTap="getBig"
        >
        This is the slider!
        </motion.div>
    )
})

export default Slider