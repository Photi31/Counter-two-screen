import React, {useState} from 'react';
import s from './App.module.css';
import {CounterScreen} from "./components/counterScreen/CounterScreen";
import {SetScreen} from "./components/setScreen/SetScreen";
import {Buttons} from "./components/buttons/Buttons";
import {v1} from "uuid";
import {MessageScreen} from "./components/messageScreen/MessageScreen";

type CounterKeyType = 'maxValue' | 'minValue' | 'counterStart' | 'counterFinish' | 'startValue' | 'finishValue'

const getFormLs = (key: string): string | null => {
   return  localStorage.getItem(key)
}

const restoreCounterValueFromLs = (key: CounterKeyType): number => {
    const valueFormLs = getFormLs(key)
    return valueFormLs === null ? 0 : Number(valueFormLs)
}


function App() {

    let [maxValue, setMaxValue] = useState(restoreCounterValueFromLs('maxValue'))
    let [minValue, setMinValue] = useState(restoreCounterValueFromLs('minValue'))
    let [counterStart, setCounterStart] = useState(restoreCounterValueFromLs('counterStart'))
    let [counterFinish, setCounterFinish] = useState(restoreCounterValueFromLs('counterFinish'))
    let [startValue, setStartValue] = useState(restoreCounterValueFromLs('startValue'))
    let [finishValue, setFinishValue] = useState(restoreCounterValueFromLs('finishValue'))
    let [message, setMessage] = useState('') //'value can be set / incorrect value


    const counterButtons = [
        {id: v1(), name: 'INC', condition: 'active'},
        {id: v1(), name: 'RESET', condition: 'active'}
    ]
    const setButtons = [
        {id: v1(), name: 'SET', condition: 'disable'}
    ]

    const isSetButtonActive = (maxValue > 0
        && minValue >= 0
        && maxValue > minValue
        && (maxValue !== finishValue
            || minValue !== startValue))

    let buttonsForCounterScreen = [...counterButtons]
    let buttonsForSetScreen = [...setButtons]

    if (isSetButtonActive) {
        buttonsForSetScreen[0].condition = 'active'
    }

    if (buttonsForSetScreen[0].condition === 'active'
        && (!message || message !== 'value can be set')) {
        setMessage('value can be set')
    }
    if (buttonsForSetScreen[0].condition === 'disable'
        && message
        && message !== 'incorrect value') {
        setMessage('incorrect value')
    }

        if (counterStart === counterFinish || message) {
            buttonsForCounterScreen[0].condition = 'disable'
        } else {
            buttonsForCounterScreen[0].condition = 'active'
        }

    if (counterStart !== startValue) {
        buttonsForCounterScreen[1].condition = 'active'
    } else {
        buttonsForCounterScreen[1].condition = 'disable'
    }

    const incrementCounter = () => {
        if (counterStart < +counterFinish) {
            let count = counterStart
            count++
            localStorage.setItem('counterStart', String(count))
            setCounterStart(count)
        }
    }
    const resetCounter = () => {
        localStorage.setItem('counterStart', String(startValue))
        setCounterStart(startValue)
    }
    const changeValue = (num: string, id: string) => {
        if (id === 'maxValue') {
            let value = +num
            localStorage.setItem('maxValue', `${value}`)
            setMaxValue(value)
        }
        if (id === 'minValue') {
            let value = +num
            localStorage.setItem('minValue', `${value}`)
            setMinValue(value)
        }
    }
    const setCounter = () => {
        buttonsForSetScreen[0].condition = 'disable'
        localStorage.setItem('counterStart', String(minValue))
        localStorage.setItem('startValue', String(minValue))
        localStorage.setItem('counterFinish', String(maxValue))
        localStorage.setItem('finishValue', String(maxValue))
        setCounterStart(minValue)
        setStartValue(minValue)
        setCounterFinish(maxValue)
        setFinishValue(maxValue)
        setMessage('')
    }

    return (
        <div className={s.App}>
            <div className={s.setBlock}>
                <SetScreen maxValue={maxValue}
                           minValue={minValue}
                           changeValue={changeValue}/>
                <Buttons buttons={buttonsForSetScreen}
                         setCounter={setCounter}/>
            </div>
            <div className={s.setBlock}>
                {message ?
                    <MessageScreen message={message}/> :
                    <CounterScreen counterStart={counterStart}
                                   counterFinish={counterFinish}/>}
                <Buttons buttons={buttonsForCounterScreen}
                         incrementCounter={incrementCounter}
                         resetCounter={resetCounter}/>
            </div>

        </div>
    );
}

export default App;
