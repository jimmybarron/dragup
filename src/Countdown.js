import useTimer from 'easytimer-react-hook'
import { useEffect } from 'react'

const Countdown = props => {

    const [timer, isTargetAchieved] = useTimer({
        countdown: true,
    })
    
    useEffect(() => {
        let minutes = [props.countdownMinTens, props.countdownMinOnes].join('')
        console.log(minutes);
        timer.stop()
        timer.start({
            startValues: {
                minutes: minutes,
            },
        })
    }, [props.countdownMinTens, props.countdownMinOnes])

    return (
        <div>
            <h1 style={{ color: 'white' }}>{timer.getTimeValues().toString()}</h1>
        </div>
    )
}

export default Countdown
