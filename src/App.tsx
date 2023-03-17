import React, {useState} from 'react';
import s from './App.module.css';
import {CounterScreen} from "./components/counterScreen/CounterScreen";
import {SetScreen} from "./components/setScreen/SetScreen";
import {Buttons} from "./components/buttons/Buttons";
import {v1} from "uuid";
import {MessageScreen} from "./components/messageScreen/MessageScreen";


function App() {

    let [maxValue, setMaxValue] = useState(Number(localStorage.getItem('maxValue')) || 5)
    let [minValue, setMinValue] = useState(Number(localStorage.getItem('minValue')) || 0)
    let [counterStart, setCounterStart] = useState(localStorage.getItem('counterStart') || '0')
    let [counterFinish, setCounterFinish] = useState(localStorage.getItem('counterFinish') || '5')
    let [startValue, setStartValue] = useState(Number(localStorage.getItem('startValue')) || 0)
    let [finishValue, setFinishValue] = useState(Number(localStorage.getItem('finishValue')) || 5)
    let [message, setMessage] = useState('') //'value can be set / incorrect value

    const buttons = {
        forCounterScreen: [{id: v1(), name: 'INC', condition: 'active'},
            {id: v1(), name: 'RESET', condition: 'active'}],
        forSetScreen: [{id: v1(), name: 'SET', condition: 'disable'}]
    }

    let buttonsForCounterScreen = [...buttons['forCounterScreen']]
    let buttonsForSetScreen = [...buttons['forSetScreen']]

    if (maxValue > 0
        && minValue >= 0
        && maxValue > minValue
        && (maxValue !== finishValue
            || minValue !== startValue)
    ) {
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

    if (+counterStart !== startValue) {
        buttonsForCounterScreen[1].condition = 'active'
    } else {
        buttonsForCounterScreen[1].condition = 'disable'
    }

    const incrementCounter = () => {
        if (+counterStart < +counterFinish) {
            let count = +counterStart
            count++
            localStorage.setItem('counterStart', String(count))
            setCounterStart(String(count))
        }
    }
    const resetCounter = () => {
        localStorage.setItem('counterStart', String(startValue))
        setCounterStart(String(startValue))
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
        setCounterStart(String(minValue))
        setStartValue(minValue)
        setCounterFinish(String(maxValue))
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
