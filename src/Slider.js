import React, { useState } from 'react'
import './Slider.css';
import { motion, useAnimation } from 'framer-motion'

const variants = {
    resetPosition : {
        y: 0,
        backgroundColor: '#000000',
    },

    getBig: {
        scale: 0.9,
        color: '#000000',
        backgroundColor: '#ffffff',
        transition: { duration: 0.1 }
    },

    float: {
        y: 0,
    }
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const Slider = React.forwardRef((props, sliderContainerRef) => {

    // This gets the height of the controller to set it's range
    const [maxHeight, setMaxHeight] = useState(0)
    // Used to hide / show the live dragging number and the countdown number
    const [dragging, setDragging] = useState(false)

    const controls = useAnimation()
    
    return (
        <motion.div
            className="dragEl"
            style={{ zIndex: '10' }}
            animate={props.isDelayDone && "resetPosition"}
            variants={variants}
            drag
            dragMomentum={false}
            dragConstraints={sliderContainerRef}
            dragElastic={0.01}
            // dragSnapToOrigin={true}
            // dragTransition={{ type: "spring", duration: "0.2", bounce: "0.4" }}
            onDragStart={(event, info) => {
                setMaxHeight(sliderContainerRef.current.offsetHeight)
                setDragging(true)
            }}
            onDrag={(event, info) => {
                props.onDrag(clamp(Math.floor(Math.abs((info.offset.y / maxHeight) * 13)), 0, props.maxNum))
            }}
            onDragEnd={(event, info) => {
                props.setDelay(prevState => prevState + 1)
                props.onDragEnd(props.dragNum)
                setDragging(false)
            }}
            whileTap="getBig"
        >
            <div className={dragging ? '' : "hide"}>
                {props.dragNum}
            </div>

            <div className={dragging ? "hide" : ''}>
                {props.displayNum}
            </div>

        </motion.div>
    )
})

export default Slider