import React from 'react';
import s from './CounterScreen.module.css'

type CounterPropsType = {
    counterStart: string
    counterFinish: string
}

export const CounterScreen = (props: CounterPropsType) => {

    const finishStyleCounter = props.counterStart !== props.counterFinish ?
                                s.counter :
                                s.counter + ' ' + s.maxValue

    return (
        <div className={finishStyleCounter}>
            {props.counterStart}
        </div>
    )
}