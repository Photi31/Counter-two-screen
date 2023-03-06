import React, {ChangeEvent, MouseEvent} from "react";
import s from './SetScreen.module.css'

type SetScreenPropsType = {
    maxValue: number
    minValue: number
    changeValue: (num: string, id: string) => void
}

export const SetScreen = (props: SetScreenPropsType) => {

    const OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.name)
        props.changeValue(e.currentTarget.value, e.currentTarget.id)
    }

    return (
        <div className={s.set}>
            <div className={s.max}>
                <h5>max value</h5>
                <input type={'number'} id={'maxValue'} onChange={OnChangeHandler} value={props.maxValue}/>
            </div>
            <div className={s.min}>
                <h5>min value</h5>
                <input type={'number'} id={'minValue'} onChange={OnChangeHandler} value={props.minValue}/>
            </div>
        </div>
    )
}