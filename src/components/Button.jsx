import React from "react";
import "./Button.css";

const isOperator = val => {
    const operators = ['.', 'AC', '%', '±']
    //includes devuelve true | false cuadno buscamos un valor determinado dentro de un array :)
    return !isNaN(val) || operators.includes(val);
};
const isZero = val => {
    // sabemos que 1 === true, entonces !0 === true, caso contrario, es false
    return !val;
};

export const Button = props => {

    //con esta sintaxis, desestructuramos al objeto {prop} y tomamos directamente valores
    const { children } = props

    const properties = {
        className: `button-wrapper ${isOperator(children) ? null : "operator"} ${isZero(children) ? null : "zero"}`,
        onClick: () => props.handleClick(children)
    }

    return(
        <div {...properties}>
            {props.children}
        </div>
    );
}



