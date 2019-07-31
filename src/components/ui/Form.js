import React, { useState } from 'react'
import styles from './Form.module.scss'
import { enter as buttonSVG } from './svg'

export default function Form(props) {
  const [value, setValue] = React.useState('')
  const [formData, setFormData] = useState(props.input)

  const handleChange = event => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    })
  }

  const updateFormData = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form className={styles.form}>
      {Object.keys(formData).map((e, i) => {
        return (
          <label key={`${i}-${e}`}>
            <span>{e}</span>
            <Input
              name={e}
              onChange={e => updateFormData(e)}
              onInput={e => handleChange(e)}
              {...formData[e]}
            />
          </label>
        )
      })}
      {props.children}
      <Button icon={buttonSVG} />
    </form>
  )
}
Form.defaultProps = {
  input: { name: { value: 'value', type: 'text' } }
}

export function Input(props) {
  return <input {...props}>{props.children}</input>
}
Input.defaultProps = {
  type: 'text'
}

export function Button(props) {
  return <button {...props}>{props.children || props.icon || props.submit}</button>
}
Button.defaultProps = {
  type: 'submit',
  submit: 'Submit'
}
