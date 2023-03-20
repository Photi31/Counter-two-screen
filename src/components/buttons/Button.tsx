import React, {MouseEvent} from 'react';
import s from './Button.module.css'

export type ButtonPropsType = {
    id: string
    name: string
    condition: string
    incrementCounter?: () => void
    resetCounter?: () => void
    setCounter?: () => void
}

export const Button = (props: ButtonPropsType) => {

    const finishButtonStyle = props.condition === 'active' ?
                            s.button :
                            s.button + ' ' + s.disable

    const ocClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        if(props.condition !== 'active') {
            return
        }

        console.log(event.currentTarget.name)
        if (event.currentTarget.name === 'INC') {
            if(props.incrementCounter) {
                props.incrementCounter()
            }
        }
        if (event.currentTarget.name === 'RESET') {
            if (props.resetCounter) {
                props.resetCounter()
            }
        }
        if (event.currentTarget.name === 'SET') {
            if (props.setCounter) {
                props.setCounter()
            }
        }
    }

    return <button className={finishButtonStyle}
                   id={props.id}
                   name={props.name}
                   onClick={ocClickHandler}>
                {props.name}
           </button>

}