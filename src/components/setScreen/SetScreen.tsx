import React from "react";
import s from './SetScreen.module.css'

type SetScreenPropsType = {
    maxValue: number
    minValue: number
}

export const SetScreen = (props: SetScreenPropsType) => {
    return (
        <div className={'set'}>
            <div className={'max'}>
                <h5>max value</h5>
                <input type={'number'} value={props.maxValue}/>
            </div>
            <div className={'min'}>
                <h5>min value</h5>
                <input type={'number'} value={props.minValue}/>
            </div>
        </div>
    )
}