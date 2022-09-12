// import { useState } from 'react'
import './inputSelection.css'

export interface SelectionOption {
    code: string | number
    label: string
}

interface Props {
  name: string
  label: string
  value: string
  options: Array<SelectionOption>
  onChange: Function
  error?: string
}

const InputSelection = (props:Props) => {
  const handleChange = ({target: {value}}: any) => {
    props.onChange(props.name, value)
  }

  return (
    <div className="selection-field">
        <select className="selection-field select" value={props.value} onChange={handleChange}>
            {props.options.map(option => 
              <option key={option.code} value={option.label}> {option.label} </option>
            )}
        </select>
      <label htmlFor={props.name} className='selection-label'>
        <span className='input-label-text'>{props.label}</span>
      </label>
      <p className='select-validation-error'>{props.error}</p>
    </div>
  )
}

export default InputSelection