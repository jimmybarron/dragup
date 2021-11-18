import React, { useEffect, useState } from 'react'
import './Slider.css';
import { motion } from 'framer-motion'

const variants = {
    getBig: {
        scale: 0.9
    }
}


const Slider = React.forwardRef((props, sliderContainerRef) => {

    const [maxHeight, setMaxHeight] = useState(0)
    
    return (
        <motion.div
            className="button"
            style={{ zIndex: '10' }}
            drag
            dragConstraints={sliderContainerRef}
            dragElastic={0.01}
            dragSnapToOrigin={true}
            dragTransition={{ type: "spring", duration: "0.2", bounce: "0.4" }}
            onDragStart={(event, info) => {
                setMaxHeight(sliderContainerRef.current.offsetHeight)
            }}
            onDrag={(event, info) => {
                props.setDragNum(Math.ceil(Math.abs((info.offset.y / maxHeight) * 10)))
            }}
            onDragEnd={(event, info) => {
                props.setCountdownNum(props.dragNum)
                props.setDragNum(0)
            }}
            variants={variants}
            whileTap="getBig">
        { props.dragNum }
        </motion.div>
    )
})

export default Slider