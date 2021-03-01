import React, { useState } from "react";
import IClient from "../../interfaces/Client";
import s from './listItem.module.css';
import Modal from "../modal/modal.component";
import { gql, request } from "graphql-request";
import useNotification from "../../hooks/notification.hook";
import { disableScroll, enableScroll, GRAPHQL_URL } from "../../common/tool/tool";

interface IProps{
    user: IClient,
}

const getMutationQuery = (edited: IClient): string => {
    const { id, firstName, lastName } = edited;
    const phone = edited.phone || '';
    const avatarUrl = edited.avatarUrl || '';
    return gql`
    mutation{
        updateClient(id: ${id}, 
        firstName: "${firstName}", 
        lastName: "${lastName}", 
        phone: "${phone}",
        avatarUrl: "${avatarUrl}"){
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            avatarUrl: avatarUrl
        }
    }`;
}

const defaultUrl = 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png';

function ListItem(props: IProps) {
    const { user } = props;
    const [isEdit, setEdit] = useState(false);
    const { addNotification, removeNotification } = useNotification();
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
                               removeNotification();
                               const query = getMutationQuery({
                                   ...data,
                                   id: user.id
                               });
                               request(GRAPHQL_URL, query)
                                   .then((res) => {
                                       addNotification('Пользователь обновлён', 'success');
                                       handleCancel();
                                   }, (err) => {
                                       console.error(err);
                                       addNotification('Ошибка', 'error');
                                       handleCancel();
                                   })
                           }}/> :
                    null
            }
        </>
    )
}

export default ListItem;
