import './inputForm.css'

interface Props {
    name: string
    type: string
    label: string
    value: string | number
    min?: string
    max?: string
    pattern?: string
    error?: any
    onChange: Function
}

const InputForm = (props: Props) => {
        
    return (
            <div className="input-field">
                <input 
                    type={props.type} 
                    min={props.min}
                    max={props.max}
                    placeholder="" 
                    name={props.name} 
                    onChange={(e) => props.onChange(props.name, e.target.value)} 
                    value={props.value}
                />
                <label htmlFor={props.name} className='input-label'>
                    <span className='input-label-text'>{props.label}</span>
                </label>
                <div className='input-validation-error'>{props.error}</div>
            </div>
            
    );
}

export default InputForm