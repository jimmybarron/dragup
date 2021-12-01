import './Countdown.css'

const Countdown = props => {

    return (
        <div className="countdownDisplay">
             <div style={{ position: 'absolute', right: '50%' }}>{props.minutes === '0' ? '00' : props.minutes}</div>
             <div style={{ position: 'absolute', left: '48%' }}>:</div>
             <div style={{ position: 'absolute', left: '59%' }}>{props.seconds === '0' ? '00' : props.seconds}</div>
        </div>
    )
}

export default Countdown
