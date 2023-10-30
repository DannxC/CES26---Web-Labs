import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, subtract, multiply, divide, reset } from '../redux/calculatorSlice';
import './Calculator.css';

function Calculator() {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.calculator.value);

  const [input, setInput] = useState("");
  const [firstInput, setFirstInput] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleNumberClick = (number) => {
    setInput((prevInput) => prevInput + number.toString());
  };

  const handleOperationClick = (op) => {
    setFirstInput(Number(input) || result);
    setOperation(op);
    setInput("");
  };

  const handleEqualsClick = () => {
    if (firstInput !== null && operation && input !== "") {
      const action = {
        "add": () => dispatch(add(Number(firstInput) + Number(input))),
        "subtract": () => dispatch(subtract(Number(firstInput) - Number(input))),
        "multiply": () => dispatch(multiply(Number(firstInput) * Number(input))),
        "divide": () => dispatch(divide(Number(firstInput) / Number(input)))
      }[operation];
      
      action();
      setInput("");
      setFirstInput(null);
      setOperation(null);
    }
  };

  const handleReset = () => {
    setInput("");
    setFirstInput(null);
    setOperation(null);
    dispatch(reset());
  };

  return (
    <div className="calculator-container">
      <div className="display">{input || result}</div>
      <div className="button-grid">
        {/* ... (todos os outros botões) */}
        <button className="button" onClick={() => handleNumberClick(7)}>7</button>
        <button className="button" onClick={() => handleNumberClick(8)}>8</button>
        <button className="button" onClick={() => handleNumberClick(9)}>9</button>
        <button className="button button-operation" onClick={() => handleOperationClick("divide")}>÷</button>
        <button className="button" onClick={() => handleNumberClick(4)}>4</button>
        <button className="button" onClick={() => handleNumberClick(5)}>5</button>
        <button className="button" onClick={() => handleNumberClick(6)}>6</button>
        <button className="button button-operation" onClick={() => handleOperationClick("multiply")}>×</button>
        <button className="button" onClick={() => handleNumberClick(1)}>1</button>
        <button className="button" onClick={() => handleNumberClick(2)}>2</button>
        <button className="button" onClick={() => handleNumberClick(3)}>3</button>
        <button className="button button-operation" onClick={() => handleOperationClick("subtract")}>-</button>
        <button className="button" onClick={() => handleNumberClick(0)}>0</button>
        <button className="button" onClick={handleReset}>Reset</button>
        <button className="button button-equals" onClick={handleEqualsClick}>=</button>
        <button className="button button-operation" onClick={() => handleOperationClick("add")}>+</button>
      </div>
    </div>
  );
}

export default Calculator;
