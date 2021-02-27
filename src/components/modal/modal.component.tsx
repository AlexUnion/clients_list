import React from 'react';
import { useForm } from "react-hook-form";
import IClient from "../../interfaces/Client";
import NamedInput from "../namedInput/namedInput.component";
import s from './modal.module.css';
import Warning from "../warning/warning.component";

interface IProps {
    title: string,
    user?: IClient,
    handleCancel: () => void,
    onSubmit: (data: IFormInput) => void,
}

interface IFormInput {
    firstName: string,
    lastName: string,
    phone?: string
}

function Modal(props: IProps) {
    const { title, user, handleCancel, onSubmit } = props;
    const { register, handleSubmit, errors } = useForm<IFormInput>();

    return (
        <div className={`overflow-hidden w-screen h-screen fixed top-0 left-0 right-0 bottom-0 ${s.container}`}>
            <div className='fixed bg-white w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl'>
                <h3 className='text-3xl my-2'>{title}</h3>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <NamedInput id='firstName'
                                name='firstName'
                                description='Введите имя'
                                placeHolder='Ваше имя'
                                register={register({
                                    required: true,
                                    minLength: 2
                                })}
                                value={user?.firstName}/>
                    {
                        errors.firstName?.type === 'required'
                        && <Warning message='Это обезательное поле'/>
                    }
                    {
                        (errors.firstName?.type === 'minLength'
                            || errors.firstName?.type === 'maxLength')
                        && <Warning message='Неккоректная длинна имени'/>
                    }
                    <NamedInput id='lastName'
                                name='lastName'
                                description='Введите фамилию'
                                placeHolder='Ваша фамилия'
                                register={register({
                                    required: true,
                                    minLength: 2
                                })}
                                value={user?.lastName}/>
                    {
                        errors.lastName?.type === 'required'
                        && <Warning message='Это обезательное поле'/>
                    }
                    {
                        (errors.lastName?.type === 'minLength'
                            || errors.lastName?.type === 'maxLength')
                        && <Warning message='Неккоректная длинна фамилии'/>
                    }
                    <NamedInput id='phone'
                                name='phone'
                                description='Введите номер телефона'
                                placeHolder='Ваш номер телефона'
                                register={register}
                                value={user?.phone}/>
                    <NamedInput id='avatarUrl'
                                name='avatarUrl'
                                description='Вставьте URL адресс вашей аватарки'
                                placeHolder='URL'
                                register={register}
                                value={user?.avatarUrl}/>
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
