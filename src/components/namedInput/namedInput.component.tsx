import React from "react";

interface IProps {
    id: string,
    description: string,
    type?: string,
    placeHolder?: string,
    value?: string,
}

function NamedInput(props: IProps) {
    const { id, description } = props;
    const value = props.value || '';
    const placeHolder = props.placeHolder || '';
    const type = props.type || 'text';
    return (
        <div className='w-4/5 m-auto'>
            <label htmlFor={id}>
                <div className='mt-2 px-2 text-left cursor-pointer'>{description}</div>
                <input className='mb-2 mt-1 py-2 px-8 rounded-md bg-gray-200 ml-0 w-full focus-within:bg-gray-300'
                       type={type}
                       id={id}
                       value={value}
                       placeholder={placeHolder}/>
            </label>
        </div>
    );
}

export default NamedInput;
