import React from 'react';
import { request, gql } from 'graphql-request'
import { useQuery, useMutation } from 'react-query';
import List from "./components/list/list.component";
import AddButton from "./components/addButton/AddButton.component";
import IClient from "./interfaces/Client";
import './App.css';

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
    const { getClients } = await request('https://test-task.expane.pro/api/graphql', query);
    return getClients;
}

function App() {
    const { data } = useQuery<Array<IClient>>('todos', getList);

    return (
        <div className="App">
            <div className="my-4 text-lg">A list of users</div>
            {
                data ?
                    (
                        <>
                            <List data={data}/>
                            <AddButton/>
                        </>
                    ) :
                    "loading"
            },
        </div>
    );
}

export default App;
