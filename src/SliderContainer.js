import { React, useRef } from 'react'
import Slider from './Slider';

const SliderContainer = props => {

    const sliderContainerRef = useRef(null)

    return (
        <div
            ref={sliderContainerRef}
            className="sliderContainer"
            style={{
                width: "150px",
                height: "100vh",
                display: "flex",
                alignItems: "flex-end"
            }}>
            
            <Slider ref={sliderContainerRef} dragNum={props.dragNum} setDragNum={props.setDragNum}/>
            
        </div>
    )
}

export default SliderContainer;