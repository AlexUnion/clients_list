import React from "react";
import addIcon from '../../icons/add.svg';
import s from './addButton.module.css';

function AddButton() {
    return (
        <div className={`${s.anim} w-10 h-10 fixed top-6 right-6 cursor-pointer`}>
            <img src={addIcon} alt="add new user"/>
        </div>
    );
}

export default AddButton;
