import React from "react";
import IClient from "../../interfaces/Client";
import ListItem from "../listItem/listItem.component";

interface IProps {
    data: Array<IClient>,
    handleEdit: (id: string) => void
}

function List(props: IProps) {
    const { data, handleEdit } = props;
    return (
        <div className='max-w-lg mx-auto z-0'>
            {
                data.map((item) => {
                    const { id } = item;
                    return <ListItem key={id} item={item} handleEdit={handleEdit}/>;
                })
            }
        </div>
    )
}

export default List;
