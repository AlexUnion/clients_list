import React from "react";
import IClient from "../../interfaces/Client";
import editIcon from '../../icons/edit.svg';

interface IProps{
    item: IClient,
}

const defaultUrl = 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png';

function ListItem(props: IProps) {
    const { item } = props;
    console.log(item);
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
                <img src={editIcon} alt="" className='h-6 w-6 ml-auto mr-0 cursor-pointer'/>
            </div>
        </div>
    )
}

export default ListItem;