import React from 'react';
import s from './modal.module.css';
import NamedInput from "../namedInput/namedInput.component";
import IClient from "../../interfaces/Client";

interface IProps {
    title: string,
    user?: IClient,
    handleCancel: () => void,
}

function Modal(props: IProps) {
    const { title, user, handleCancel } = props;
    return (
        <div className={`overflow-hidden w-screen h-screen fixed top-0 left-0 right-0 bottom-0 ${s.container}`}>
            <div className='fixed bg-white w-1/2 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl'>
                <h3 className='text-3xl my-2'>{title}</h3>
                <form action="">
                    <NamedInput id={'firstName'}
                                description={'Введите имя'}
                                placeHolder={'Ваше имя'}
                                value={user?.firstName}/>
                    <NamedInput id={'lastName'}
                                description={'Введите фамилию'}
                                placeHolder={'Ваша фамилия'}
                                value={user?.lastName}/>
                    <NamedInput id={'phone'}
                                description={'Введите номер телефона'}
                                placeHolder={'Ваш номер телефона'}
                                value={user?.phone}/>
                    <div className="flex justify-end m-3">
                        <button className={`bg-green-500 ${s.btn} hover:bg-green-600`}>Подтвердить</button>
                        <button className={`bg-red-500 ${s.btn} hover:bg-red-600`}
                                onClick={handleCancel}>Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
