import React, { useState, useEffect } from 'react';
import { request, gql } from 'graphql-request'
import { useQuery } from 'react-query';
import List from "./components/list/list.component";
import AddButton from "./components/addButton/AddButton.component";
import IClient from "./interfaces/Client";
import './App.css';
import useNotification from "./hooks/notification.hook";
import Modal from "./components/modal/modal.component";
import { disableScroll, enableScroll, GRAPHQL_URL } from "./common/tool/tool";

const query = gql`
  query{
  getClients{
    id,
    firstName,
    lastName,
    phone,
    avatarUrl
  }
}`;

function getAddNewUserQuery(firstName: string, lastName: string,
                            phone: string = '', url: string = '') {
    return gql`
    mutation{
        addClient(firstName: "${firstName}", 
            lastName: "${lastName}", 
            phone: "${phone}", 
            avatarUrl: "${url}") {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                avatarUrl: avatarUrl        
        }  
    }`;
}

async function getList() {
    const { getClients } = await request(GRAPHQL_URL, query);
    return getClients;
}

function App() {
    const [isNeedAdd, setNeedAdd] = useState(false);
    const { addNotification, removeNotification } = useNotification();
    const { data, error } = useQuery<Array<IClient>>('todos', getList);

    useEffect(() => {
        if (error) {
            console.error(error);
            addNotification('Упс... Что-то пошло не так', 'error');
        }
    }, [addNotification, error]);

    useEffect(() => {
        if (isNeedAdd){
            disableScroll();
        }
        else {
            enableScroll();
        }
    }, [isNeedAdd]);

    const handleCancel = () => setNeedAdd(false);

    return (
        <div className="App" >
            <div className="my-4 text-3xl text-left max-w-xl mx-auto p-4 bg-gray-100 text-gray-900 rounded-md z-0">
                Список пользователей
            </div>
            {
                data ?
                    (
                        <>
                            <List data={data}/>
                            <AddButton onClick={() => setNeedAdd(true)}/>
                        </>
                    ) :
                    (
                        <div className="my-6 text-lg">
                            loading
                        </div>
                    )
            }
            {
                isNeedAdd ?
                    (
                        <Modal title="Добавить нового пользователя"
                               handleCancel={handleCancel}
                               onSubmit={({ firstName, lastName, phone,
                                              avatarUrl }) => {
                                   handleCancel();
                                   removeNotification();
                                   const query = getAddNewUserQuery(firstName, lastName, phone, avatarUrl);
                                   request(GRAPHQL_URL, query)
                                       .then(() => {
                                           addNotification('Пользователь успешно создан', 'success');
                                       }, (e) => {
                                           console.error(e?.message);
                                           addNotification('Возникла ошибка во время операции', 'error');
                                       })
                               }}/>
                    ) :
                    null
            }
        </div>
    );
}

export default App;
