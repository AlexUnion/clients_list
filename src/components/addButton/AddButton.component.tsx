import React from "react";
import addIcon from '../../icons/add.svg';
import s from './addButton.module.css';

interface IProps {
    onClick: React.MouseEventHandler<HTMLDivElement>
}

function AddButton({ onClick }: IProps) {
    return (
        <div className={`${s.anim} w-10 h-10 fixed top-6 right-6 cursor-pointer z-0`}
             onClick={onClick}>
            <img src={addIcon} alt="add new user"/>
        </div>
    );
}

export default AddButton;
