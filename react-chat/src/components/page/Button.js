import React from 'react';

const Button = ({onClick, text}) => {

    return (
        <button className="sign-out" onClick={onClick}>{text}</button>
    );
}
 
export default Button;