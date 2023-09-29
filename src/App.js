import Header from "./components/Header/Header";
import UserInput from "./components/UserInput/UserInput";
import ResultTable from "./components/ResultTable/ResultTable";
import { useState } from "react";

function App() {

  const [userInput,setuserinput] = useState(null);
  

  const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...
      setuserinput(userInput);
   
  };
  

    const yearlyData = []; // per-year results
  if(userInput){
    let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });

    }
  }
    // do something with yearlyData ...
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div>
      <Header />
      <UserInput onCalculate={calculateHandler}/>
      {!userInput ? <p style={{textAlign: 'center'}}>No Investment calculate yet</p> :  
      
      <div>
        <table className="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Invested Capital</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Total Savings</th>
          </tr>
        </thead>
        <tbody>
        {yearlyData.map(( listValue) => {
          return (
            <tr key={listValue.year}>
              <td>{listValue.year}</td>
              <td>{formatter.format(userInput['current-savings'] + listValue.year*listValue.yearlyContribution)}</td>
              <td>{formatter.format(listValue.yearlyInterest)}</td>
              <td>{formatter.format(listValue.savingsEndOfYear - userInput['current-savings'] - listValue.year*listValue.yearlyContribution)}</td>
              <td>{formatter.format(listValue.savingsEndOfYear)}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
    }
    </div>
  );
}

export default App;
