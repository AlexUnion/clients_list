import React from "react";
import IClient from "../../interfaces/Client";
import s from './listItem.module.css';

interface IProps{
    item: IClient,
    handleEdit: (id: string) => void,
}

const defaultUrl = 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png';

function ListItem(props: IProps) {
    const { item, handleEdit } = props;
    const url = item.avatarUrl || defaultUrl;
    return (
        <div className='bg-gray-100 p-6 flex flex-shrink space-x-4 mb-1 rounded-xl justify-around items-center'>
            <div className='w-1/5'>
                <img src={url} alt="" className='h-12 w-12 rounded-xl'/>
            </div>
            <div className='w-3/5'>
                <div id={item.id}>
                    {item.firstName}
                    &nbsp;
                    {item.lastName}
                </div>
                <div>
                    {
                        item.phone || 'Номер не указан'
                    }
                </div>
            </div>
            <div className='w-1/5'>
                <div className={`h-6 w-6 ml-auto mr-0 cursor-pointer ${s.edit}`}
                     onClick={() => handleEdit(item.id)}/>
            </div>
        </div>
    )
}

export default ListItem;