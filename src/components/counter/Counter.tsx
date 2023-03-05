import React from 'react';
import s from './Counter.module.css'

type CounterPropsType = {
    counter:number
}

export const Counter = (props: CounterPropsType) => {

    const finishStyleCounter = props.counter !== 5 ?
                                s.counter :
                                s.counter + ' ' + s.maxValue

    return (
        <div className={finishStyleCounter}>
            {props.counter}
        </div>
    )
}