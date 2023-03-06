import React, {useState} from 'react';
import s from './App.module.css';
import {CounterScreen} from "./components/counterScreen/CounterScreen";
import {SetScreen} from "./components/setScreen/SetScreen";
import {Buttons} from "./components/buttons/Buttons";
import {v1} from "uuid";



function App() {

    let [counter, setCounter] = useState('0')
    let [maxValue, setMaxValue] = useState(0)
    let [minValue, setMinValue] = useState(0)

    const buttons = {
    forCounterScreen: [{id: v1(), name: 'INC', condition: 'active'},
                       {id: v1(), name: 'RESET', condition: 'active'}],
    forSetScreen: [{id: v1(), name: 'SET', condition: 'disable'}]
    }

    let buttonsForCounterScreen = [...buttons['forCounterScreen']]

    if (counter === '0') {
        buttonsForCounterScreen[1].condition = 'disable'
    } else {
        buttonsForCounterScreen[1].condition = 'active'
    }

    if (counter === '5') {
        buttonsForCounterScreen[0].condition = 'disable'
    } else {
        buttonsForCounterScreen[0].condition = 'active'
    }

    let buttonsForSetScreen = [...buttons['forSetScreen']]

    if (+maxValue > 0 && +maxValue > +minValue) {
        buttonsForSetScreen[0].condition = 'active'
    }
    if (+minValue >= 0 && +minValue < +maxValue) {
        buttonsForSetScreen[0].condition = 'active'
    }

    const incrementCounter = () => {
        if (+counter < 5) {
            let count = +counter
            setCounter(String(++count))
        }
    }

    const resetCounter = () => {
        setCounter('0')
    }

    const changeValue = (num: string, id: string) => {
        if (id === 'maxValue') {
            setMaxValue(+num)
        }
        if (id === 'minValue') {
            setMinValue(+num)
        }
    }

    return (
        <div className={s.App}>
            <div className={s.setBlock}>
                <SetScreen maxValue={maxValue}
                           minValue={minValue}
                           changeValue={changeValue}/>
                <Buttons buttons={buttonsForSetScreen}/>
            </div>
            <div className={s.setBlock}>
                <CounterScreen counter={counter}/>
                <Buttons buttons={buttonsForCounterScreen}
                         incrementCounter={incrementCounter}
                         resetCounter={resetCounter}/>
            </div>

        </div>
    );
}

export default App;
