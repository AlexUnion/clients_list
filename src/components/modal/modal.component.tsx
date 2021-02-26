import React from 'react';
import { useForm } from "react-hook-form";
import IClient from "../../interfaces/Client";
import NamedInput from "../namedInput/namedInput.component";
import s from './modal.module.css';

interface IProps {
    title: string,
    user?: IClient,
    handleCancel: () => void,
}

interface IFormInput {
    firstName: string,
    lastName: string,
    phone?: string
}

const onSubmit = (data: IFormInput) => {console.log(data)};

function Modal(props: IProps) {
    const { title, user, handleCancel } = props;
    const { register, handleSubmit } = useForm<IFormInput>();

    return (
        <div className={`overflow-hidden w-screen h-screen fixed top-0 left-0 right-0 bottom-0 ${s.container}`}>
            <div className='fixed bg-white w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl'>
                <h3 className='text-3xl my-2'>{title}</h3>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <NamedInput id='firstName'
                                name='firstName'
                                description='Введите имя'
                                placeHolder='Ваше имя'
                                register={register}
                                value={user?.firstName}/>
                    <NamedInput id='lastName'
                                name='lastName'
                                description='Введите фамилию'
                                placeHolder='Ваша фамилия'
                                register={register}
                                value={user?.lastName}/>
                    <NamedInput id='phone'
                                name='phone'
                                description='Введите номер телефона'
                                placeHolder='Ваш номер телефона'
                                register={register}
                                value={user?.phone}/>
                    <div className="flex justify-end m-3">
                        <button className={`bg-green-500 ${s.btn} hover:bg-green-600`}
                                type="submit">Подтвердить</button>
                        <button className={`bg-red-500 ${s.btn} hover:bg-red-600`}
                                onClick={handleCancel}
                                type="button">Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
