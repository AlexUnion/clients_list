import React, {useEffect} from 'react';
import { request, gql } from 'graphql-request'
import { useQuery } from 'react-query';
import List from "./components/list/list.component";
import AddButton from "./components/addButton/AddButton.component";
import IClient from "./interfaces/Client";
import './App.css';
import useNotification from "./hooks/notification.hook";

const GRAPHQL_URL = 'https://test-task.expane.pro/api/graphql';

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

async function getList() {
    const { getClients } = await request(GRAPHQL_URL, query);
    return getClients;
}

function App() {
    const { addNotification } = useNotification();
    const { data, error } = useQuery<Array<IClient>>('todos', getList);

    useEffect(() => {
        if (error) {
            addNotification('Упс... Что-то пошло не так', 'error');
        }
    }, [error]);

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
                            <AddButton/>
                        </>
                    ) :
                    "loading"
            }
        </div>
    );
}

export default App;
