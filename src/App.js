import React, { Component } from 'react';
import './App.css';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { ClearButton } from './components/ClearButton';




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
      this.setState({ input: !isNaN(val) ? String(val) : '0', error : 0  });
    } else if( !((isNaN(val) || val === '0') && ((isNaN(expr.charAt(expr.length-1))) || expr === '')) ){
      this.setState({ input: expr === '0' && !isNaN(val) ? String(val) : expr + String(val) });
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
    if (String(expr) === "NaN"){
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
      if (String(expr) === "NaN" || expr === Infinity){
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
          <div className="row">
            <ClearButton handleClick={()=>this.clear()}>AC</ClearButton>
            <ClearButton handleClick={()=>this.delete()}>◀</ClearButton>
            <Button handleClick={()=>this.sign()}>±</Button>
            <Button handleClick={()=>this.handle('/')}>÷</Button>
          </div>
          <div className="row">
            <Button handleClick={this.handle}>7</Button>
            <Button handleClick={this.handle}>8</Button>
            <Button handleClick={this.handle}>9</Button>
            <Button handleClick={()=>this.handle('*')}>×</Button>
          </div>
          <div className="row">
            <Button handleClick={this.handle}>4</Button>
            <Button handleClick={this.handle}>5</Button>
            <Button handleClick={this.handle}>6</Button>
            <Button handleClick={this.handle}>-</Button>
          </div>
          <div className="row">
            <Button handleClick={this.handle}>1</Button>
            <Button handleClick={this.handle}>2</Button>
            <Button handleClick={this.handle}>3</Button>
            <Button handleClick={this.handle}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.handle}>0</Button>
            <Button handleClick={this.addDecimal}>.</Button>
            <Button handleClick={()=>this.calculate()}>=</Button>
          </div>
        </div>
      </div>
      );
    }  
};

export default App;
