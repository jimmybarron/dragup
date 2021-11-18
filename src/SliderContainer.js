import { React, useRef } from 'react'
import Slider from './Slider';

const SliderContainer = props => {

    const sliderContainerRef = useRef(null)

    return (

        <div
            className="numberSlider"
            style={{
                display: "flex",
                flexDirection: "column",
                position: 'relative',
                width: "150px",
                height: "90vh",
            }}>
            
            <svg
                height="100%"
                width="100%"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: 'absolute',
            }}>
                <svg>
                    <line x1="50%" x2="50%" y1="10%" y2="90%" stroke="#666" stroke-width="2"/>
                </svg>
            </svg>

            <div
                ref={sliderContainerRef}
                className="sliderContainer"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'flex-end',
                    position: 'relative',
                    width: "150px",
                    height: "90vh",
                }}>
    
                <Slider
                    ref={sliderContainerRef}
                    dragNum={props.dragNum}
                    setDragNum={props.setDragNum}
                    setCountdownNum={props.setCountdownNum}/>
            
            </div>
    
            {/* <div>
                <svg>
                    <circle cx="50%" cy="2%" r="10" fill="#666"/>
                </svg>
            </div> */}

        </div>
        
    )
}

export default SliderContainer;