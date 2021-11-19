import useTimer from 'easytimer-react-hook'
import { useEffect } from 'react'

const Countdown = props => {

    const [timer, isTargetAchieved] = useTimer({
        countdown: true,
    })
    
    useEffect(() => {
        console.log(props.countdownNum, timer.getConfig());
        timer.stop()
        timer.start({
            startValues: {
                minutes: props.countdownNum,
            },
        })
    }, [props.countdownNum])

    return (
        <div>
            <h1 style={{ color: 'white' }}>{timer.getTimeValues().toString()}</h1>
        </div>
    )
}

export default Countdown