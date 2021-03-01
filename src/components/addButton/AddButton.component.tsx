import React from "react";
import addIcon from '../../icons/add.svg';
import s from './addButton.module.css';

const GRAPHQL_URL = 'https://test-task.expane.pro/api/graphql';

function AddButton() {
    return (
        <div className={`${s.anim} w-10 h-10 fixed top-6 right-6 cursor-pointer z-0`}>
            <img src={addIcon} alt="add new user"/>
        </div>
    );
}

export default AddButton;
