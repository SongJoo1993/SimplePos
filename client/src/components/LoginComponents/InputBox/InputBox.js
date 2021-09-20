import "./InputBox.scss";

function InputBox({ label, name, type }) {
    return (
        <div className="input-box">
            <label htmlFor={name} className="input-box__label">
                {label}
            </label>
            <input type={type} id={name} name={name} className="input-box__input" />
        </div>
    );
}

export default InputBox;
