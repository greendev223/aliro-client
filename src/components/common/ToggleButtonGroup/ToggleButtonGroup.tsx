import { useEffect, useState } from 'react'
import './toggleButtonGroup.css'

type Props = {
    options: Array<string>,
    name: string,
    value: string,
    label: string,
    onChange: Function
    error?: any
}

const ToggleButtonGroup = (props: Props) => {
    const [value, setValue] = useState(props.value);

    const handleClick = (val: string) => {
        setValue(val);
        props.onChange(props.name, val);
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <div style={{ height: 42}}>
            <div className='toggle-button-group-container'>
                <p className='toggle-button-label'>{props.label}:</p>
                <div className='toggle-button-group'>
                    {props.options.map((option) => {
                        const style = option === value ? { border: '2px solid #752AFF' } : {}
                        return (
                            <div className='toggle-button'
                                style={style} key={option} onClick={() => { handleClick(option) }} >
                                {option}
                            </div>
                        )
                    })}

                </div>
                <p className='toggle-validation-error'>{props.error}</p>
            </div>
            
        </div>
    )
}

export default ToggleButtonGroup
