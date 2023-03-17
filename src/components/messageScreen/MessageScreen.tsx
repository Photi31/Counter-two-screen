import React from 'react';
import s from "../messageScreen/MessageScreen.module.css";

type MessageScreenPropsType = {
    message: string
}

export const MessageScreen = (props: MessageScreenPropsType) => {

    const styleForMessage = props.message !== 'incorrect value' ?
        s.message : s.message + ' ' + s.error

    return <div className={styleForMessage}>
        {props.message}
    </div>
}