import { React, useRef } from 'react'
import Slider from './Slider';

const SliderContainer = () => {

    const constraintsRef = useRef(null)

    return (
        <div
            ref={constraintsRef}
            style={{
                width: "150px",
                height: "85vw",
                display: "flex",
                alignItems: "flex-end"
            }}>
            <Slider ref={constraintsRef}/>
        </div>
    )
}

export default SliderContainer;