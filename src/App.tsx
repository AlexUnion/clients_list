import React, { useState } from 'react';
import { request, gql } from 'graphql-request'
import { useQuery, useMutation } from 'react-query';
import List from "./components/list/list.component";
import AddButton from "./components/addButton/AddButton.component";
import IClient from "./interfaces/Client";
import './App.css';
import Modal from "./components/modal/modal.component";

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

type Edit = {
    isEdit: boolean,
    id: string | null
}

async function getList() {
    const { getClients } = await request('https://test-task.expane.pro/api/graphql', query);
    return getClients;
}

const enableScroll = () => {
    document.body.style.overflow = "scroll";
};

const disableScroll = () => {
    document.body.style.overflow = "hidden";
};

function App() {
    const [isEdit, setEdit] = useState<Edit>({
        isEdit: false,
        id: null,
    });
    const [isRegister, setRegister] = useState<boolean>(false);

    if ((isEdit.isEdit && isEdit.id) || isRegister) disableScroll();
    else enableScroll();

    function handleEdit(id: string) {
        setEdit({
            isEdit: true,
            id,
        });
    }
    function handleCancel() {
        setEdit({
            isEdit: false,
            id: null,
        })
    }

    const { data } = useQuery<Array<IClient>>('todos', getList);

    return (
        <div className="App" >
            <div className="my-4 text-3xl text-left max-w-xl mx-auto p-4 bg-gray-100 text-gray-900 rounded-md z-0">
                Список пользователей
            </div>
            {
                data ?
                    (
                        <>
                            <List data={data} handleEdit={handleEdit}/>
                            <AddButton/>
                        </>
                    ) :
                    "loading"
            }
            {
                isEdit.isEdit && data ?
                    <Modal title='Редактировать пользователя'
                           user={data.find((item) => item.id === isEdit.id)}
                           handleCancel={handleCancel}/> :
                    null
            }
        </div>
    );
}

export default App;
