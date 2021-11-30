import { React, useState, useEffect } from 'react'
import useTimer from 'easytimer-react-hook'
import './App.css';
import Countdown from './Countdown'
import SliderContainer from './SliderContainer';
import Button from './Button';

function App() {

    // Used to display the current drag number
    const [dragNumMinOnes, setDragNumMinOnes] = useState(0)
    const [dragNumMinTens, setDragNumMinTens] = useState(0)

    // Used to send the current drag number to the countdown on drag end event
    const [countdownMinOnes, setCountdownMinOnes] = useState(0)
    const [countdownMinTens, setCountdownMinTens] = useState(0)
    
    const handleReset = () => {
        setCountdownMinOnes(0)
        setCountdownMinTens(0)
        timer.stop()
    }

    const [timer, isTargetAchieved] = useTimer({
        countdown: true,
    })

    // When the user lifts their finger and a new countdown is set
    useEffect(() => {
        let newTime = [countdownMinTens, countdownMinOnes].join('')
        // Create an async function that starts a timer; awaits a delay before setting the time; then clears that timeout
        let startTimeout = () => {
            return setTimeout(() => {
                console.log('Set timeout Running');
                timer.start({
                    startValues: {
                        minutes: newTime,
                    },
                })
            }, 4000)    
        }
        let starter = async () => {
            let timeoutID = await startTimeout()
            console.log('timeout ID:', timeoutID);
            console.log(newTime);
            // await clearTimeout(timeoutID)
        }
        timer.stop()
        starter()

    }, [countdownMinTens, countdownMinOnes, timer])

    return (
        <div className="App">
            
            <Countdown
                time={timer.getTimeValues().toString()}
            />

            <div style={{ display: 'flex', }}>

                <SliderContainer
                    id="sliderMinTens"
                    width="100px"
                    dragNum={dragNumMinTens}
                    onDrag={setDragNumMinTens}
                    onDragEnd={setCountdownMinTens}/>

                <div style={{ width: '25px', }}></div>

                <SliderContainer
                    id="sliderMinOnes"
                    width="100px"
                    dragNum={dragNumMinOnes}
                    onDrag={setDragNumMinOnes}
                    onDragEnd={setCountdownMinOnes}/>

            </div>

            <Button
                onClick={handleReset}/>

        </div>
    );  
}

export default App;