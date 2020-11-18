import React from "react";
import "./Button.css";

const isOperator = val => {
    return !isNaN(val) || val === '.' || val === 'AC' || val === '%' || val === '±';
};
const isZero = val => {
    return val === '0';
};
export const Button = props => (<div className={`button-wrapper ${isOperator(props.children) ? null : "operator"} ${isZero(props.children) ? null : "zero"}`} onClick={() => props.handleClick(props.children)}>{props.children}</div>);
