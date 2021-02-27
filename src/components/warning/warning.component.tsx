import React from "react";

interface IProps {
    message: string,
}

function Warning({ message }: IProps) {
    return (
        <div className="text-red-800 text-sm">
            * {message}
        </div>
    )
}

export default Warning;
