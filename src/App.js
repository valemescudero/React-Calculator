import React, { Component } from 'react';
import './App.css';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { ClearButton } from './components/ClearButton';

/**
 * La funcion row, devuelve (segun sus props) 2 valores posibles, el primero, una lista de botones
 * cuyos valores son asignados mediante un array de datos. El segundo, los hijos (para botones especiales)
 * @param {*} arr data array
 * @param {*} children special children
 * @return row
 */
const Row = props => {
  const {arr = [],children, handleClick} = props

  return(
    <div className="row">
      {arr.map((value,key)=>{
        return(
          <Button handleClick={handleClick}>{value}</Button>
        )
      })}

    {children}
    </div>
  )
}


class App extends Component {

 constructor(props){
   super(props);

   this.state = {
     input: "0",
     error: 0,
   };
 }

  handle = val => {
    let expr =  String(this.state.input);
    if(this.state.error === 1){

      this.setState(
        { 
          input: !isNaN(val) ? String(val) : '0', error : 0  }
        );

    } else if( !((isNaN(val) || val === '0') && ((isNaN(expr.charAt(expr.length-1))) || expr === '')) ){

      this.setState(
        {
           input: expr === '0' && !isNaN(val) ? String(val) : expr + String(val) 
        }
      );
    }
  };

  clear = () => {
    this.setState({ input:'0' });
  };

  delete = () => {
    let expr =  String(this.state.input);
    if(this.state.error === 1){
      this.setState({ input: '0', error : 0  });
    } else if (expr.length === 1){
      this.setState({ input:'0' });
    } else {
      expr = expr.slice(0,expr.length-1);
      this.setState({ input:expr });
    };
  };

  addDecimal = () => {
    let expr =  String(this.state.input);
    if(this.state.error === 1){
      this.setState({ input: '0', error : 0  });
    } else if(expr.indexOf('.' === -1) && !isNaN(expr.charAt(expr.length-1))){
      this.setState({
        input: expr + '.'
      });
    };
  };

  sign = () => {
    let expr = this.state.input * -1;
    if (isNaN(expr)){
      this.setState({ input: "ERROR", error: 1 });
    } else {
      this.setState({
        input: expr
      });
    };
  };
 
  calculate = () => {
    let expr = this.state.input;
    if (!isNaN(expr.charAt(expr.length-1))) {
      expr = eval(expr);
      if (isNaN(expr)|| expr === Infinity){
        this.setState({ input: "ERROR", error: 1  })
      } else {
        this.setState({ input: expr })
      };
    };
  };


  render() {
    return (<div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input}></Input>

          <Row>
            <ClearButton handleClick={()=>this.clear()}>AC</ClearButton>
            <ClearButton handleClick={()=>this.delete()}>◀</ClearButton>
            <Button handleClick={()=>this.sign()}>±</Button>
            <Button handleClick={()=>this.handle('/')}>÷</Button>
          </Row>
          
          <Row arr={[7,8,9]} handleClick={this.handle}>
            <Button handleClick={()=>this.handle('*')}>×</Button>
          </Row>

          <Row arr={[4,5,6,'-']} handleClick={this.handle}></Row>

          <Row arr={[1,2,3,'+']} handleClick={this.handle}></Row>

          <Row arr={[0]} handleClick={this.handle}>
            <Button handleClick={this.addDecimal}>.</Button>
            <Button handleClick={()=>this.calculate()}>=</Button>
          </Row>
        
        </div>
      </div>
      );
    }  
};

export default App;
