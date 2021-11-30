import './Button.css'

const Button = props => {

    return (
        <button onClick={props.onClick} className="Button">
            Reset
        </button>
    )

}

export default Button