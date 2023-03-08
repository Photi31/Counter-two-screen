import React, {useState} from 'react';
import s from './App.module.css';
import {CounterScreen} from "./components/counterScreen/CounterScreen";
import {SetScreen} from "./components/setScreen/SetScreen";
import {Buttons} from "./components/buttons/Buttons";
import {v1} from "uuid";



function App() {

    let [maxValue, setMaxValue] = useState(5)
    let [minValue, setMinValue] = useState(0)
    let [counterStart, setCounterStart] = useState('0')
    let [counterFinish, setCounterFinish] = useState('5')
    let [startValue, setStartValue]= useState(0)
    let [finishValue, setFinishValue] = useState(5)

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

    if (counterStart === counterFinish) {
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
            setCounterStart(String(++count))
        }
    }

    const resetCounter = () => {
        setCounterStart(String(minValue))
    }

    const changeValue = (num: string, id: string) => {
        if (id === 'maxValue') {
            setMaxValue(+num)
        }
        if (id === 'minValue') {
            setMinValue(+num)
        }
    }

    const setCounter = () => {
        buttonsForSetScreen[0].condition = 'disable'
        setCounterStart(String(minValue))
        setStartValue(minValue)
        setCounterFinish(String(maxValue))
        setFinishValue(maxValue)
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
                <CounterScreen counterStart={counterStart} counterFinish={counterFinish}/>
                <Buttons buttons={buttonsForCounterScreen}
                         incrementCounter={incrementCounter}
                         resetCounter={resetCounter}/>
            </div>

        </div>
    );
}

export default App;
