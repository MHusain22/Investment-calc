import React, { useState } from 'react'

const UserInput = (props) => {

    const initialUSerInput = {
        "current-savings":10000,
        "yearly-contribution":1200,
        "expected-return":7,
        "duration":10
    }

    //we are using one state instead of 4 state required for 4 inputs

    const[UserInput,setUserInput] = useState(initialUSerInput);

    const submitHandler = (event) => {
        event.preventDefault();
        //lifting the state up
        props.onCalculate(UserInput);
    };

    const resetHandler = () => {
        setUserInput(initialUSerInput);
    }
    //we use one function instead of every single function with input and value
    const inputHandler = (input,value) => {
        // console.log(input,value);
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                [input]: +value,
            };
        });
    };

    // const currSaveHandler = (event) => {
    //     console.log(event.target.value);
    //   };
    //   const yearlyHandler = (event) => {
    //     console.log(event.target.value);
    //   };
    //   const expintHandler = (event) => {
    //     console.log(event.target.value);
    //   };
    //   const invdurHandler = (event) => {
    //     console.log(event.target.value);
    //   };

  return (
    <div>
        <form className="form" onSubmit={submitHandler}>
        <div className="input-group">
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input type="number" id="current-savings" value={UserInput['current-savings']} onChange={(event) => inputHandler('current-savings',event.target.value)} />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input type="number" value={UserInput['yearly-contribution']} id="yearly-contribution" onChange={(event) => inputHandler('yearly-contribution',event.target.value)} />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input type="number" id="expected-return" value={UserInput['expected-return']} onChange={(event) => inputHandler('expected-return',event.target.value)}/>
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input type="number" id="duration" value={UserInput['duration']} onChange={(event) => inputHandler('duration',event.target.value)} />
          </p>
        </div>
        <p className="actions">
          <button type="reset" onClick={resetHandler} className="buttonAlt">
            Reset
          </button>
          <button type="submit" className="button">
            Calculate
          </button>
        </p>
      </form>
    </div>
  )
}

export default UserInput