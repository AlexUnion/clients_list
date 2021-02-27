import React, { useState, useEffect } from "react";
import IClient from "../../interfaces/Client";
import s from './listItem.module.css';
import Modal from "../modal/modal.component";

interface IProps{
    user: IClient,
}

const enableScroll = () => {
    document.body.style.overflow = "scroll";
};
const disableScroll = () => {
    document.body.style.overflow = "hidden";
};

const defaultUrl = 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png';

function ListItem(props: IProps) {
    const { user } = props;
    const [isEdit, setEdit] = useState(false);
    const handleEdit = () => {
        disableScroll();
        setEdit(true);
    }
    const handleCancel = () => {
        enableScroll();
        setEdit(false);
    }
    const url = user.avatarUrl || defaultUrl;

    return (

        <>
            <div className='bg-gray-100 p-6 flex flex-shrink space-x-4 mb-1 rounded-xl justify-around items-center'>
                <div className='w-1/5'>
                    <img src={url} alt="" className='h-12 w-12 rounded-xl'/>
                </div>
                <div className='w-3/5'>
                    <div id={user.id}>
                        {user.firstName}
                        &nbsp;
                        {user.lastName}
                    </div>
                    <div>
                        {
                            user.phone || 'Номер не указан'
                        }
                    </div>
                </div>
                <div className='w-1/5'>
                    <div className={`h-6 w-6 ml-auto mr-0 cursor-pointer ${s.edit}`}
                         onClick={handleEdit}/>
                </div>
            </div>
            {
                isEdit ?
                    <Modal title='Редактировать пользователя'
                           user={user}
                           handleCancel={handleCancel}
                           onSubmit={(data) => {

                           }}/> :
                    null
            }
        </>
    )
}

export default ListItem;