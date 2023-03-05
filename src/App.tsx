import React, {useState} from 'react';
import s from './App.module.css';
import {Counter} from "./components/counter/Counter";
import {Buttons} from "./components/buttons/Buttons";
import {v1} from "uuid";



function App() {

    let [counter, setCounter] = useState<number>(0)

    const buttons = [
        {id: v1(), name: 'INC', condition: 'active'},
        {id: v1(), name: 'RESET', condition: 'active'}
    ]

    let buttonsForButton = [...buttons]

    if (counter === 0) {
        buttonsForButton[1].condition = 'disable'
    } else {
        buttonsForButton[1].condition = 'active'
    }

    if (counter === 5) {
        buttonsForButton[0].condition = 'disable'
    } else {
        buttonsForButton[0].condition = 'active'
    }

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
            <Counter counter={counter}/>
            <Buttons buttons={buttonsForButton}
                     incrementCounter={incrementCounter}
                     resetCounter={resetCounter}/>
        </div>
    );
}

export default App;
