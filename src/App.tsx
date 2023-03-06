import React, {useState} from 'react';
import s from './App.module.css';
import {CounterScreen} from "./components/counterScreen/CounterScreen";
import {SetScreen} from "./components/setScreen/SetScreen";
import {Buttons} from "./components/buttons/Buttons";
import {v1} from "uuid";



function App() {

    let [counter, setCounter] = useState<number>(0)

    const buttons = {
    forCounterScreen: [{id: v1(), name: 'INC', condition: 'active'},
                       {id: v1(), name: 'RESET', condition: 'active'}],
    forSetScreen: [{id: v1(), name: 'SET', condition: 'disable'}]
    }

    let buttonsForCounterScreen = [...buttons['forCounterScreen']]

    if (counter === 0) {
        buttonsForCounterScreen[1].condition = 'disable'
    } else {
        buttonsForCounterScreen[1].condition = 'active'
    }

    if (counter === 5) {
        buttonsForCounterScreen[0].condition = 'disable'
    } else {
        buttonsForCounterScreen[0].condition = 'active'
    }

    let buttonsForSetScreen = [...buttons['forSetScreen']]

    const incrementCounter = () => {
        if (counter < 5) {
            setCounter(++counter)
        }
    }

    const resetCounter = () => {
        setCounter(0)
    }

    return (
        <div className={s.App}>
            <div className={'setBlock'}>
                <SetScreen maxValue={5} minValue={0}/>
                <Buttons buttons={buttonsForSetScreen}/>
            </div>
            <CounterScreen counter={counter}/>
            <Buttons buttons={buttonsForCounterScreen}
                     incrementCounter={incrementCounter}
                     resetCounter={resetCounter}/>
        </div>
    );
}

export default App;
