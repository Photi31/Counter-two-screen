import React, {useState} from 'react';
import s from './App.module.css';
import {CounterScreen} from "./components/counterScreen/CounterScreen";
import {SetScreen} from "./components/setScreen/SetScreen";
import {Buttons} from "./components/buttons/Buttons";
import {v1} from "uuid";



function App() {

    const initialMinValue = 0
    const initialMaxValue = 0

    let [maxValue, setMaxValue] = useState(initialMaxValue)
    let [minValue, setMinValue] = useState(initialMinValue)
    let [counterStart, setCounterStart] = useState(String(initialMinValue))
    let [counterFinish, setCounterFinish] = useState(String(initialMaxValue))
    let [startValue, setStartValue]= useState(initialMinValue)
    let [finishValue, setFinishValue] = useState(initialMaxValue)

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
