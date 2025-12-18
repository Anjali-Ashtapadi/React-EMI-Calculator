import React,{useState} from 'react'
import '../assets/Calculator.css'
import PieChart from './Chart';
function Calculator(){

  const [formdata,setFormData] = useState({
    principal:"",
    interest:"",
    tenure:""
  });

  const [data, setData] = useState(null);

  const [error, setError] = useState("");

  const [totalAmount, setTotalAmount] = useState(null);

  const [totalInterest, setTotalInterest] = useState(null);

  const {principal, interest, tenure} = formdata;

  const handleChange = (e) =>{
    setFormData({...formdata, [e.target.name]:e.target.value});
    console.log(formdata);
    setError("");

  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    handleCalculation();
  };

  const handleCalculation = () =>{
    if (!principal || !interest || !tenure){
      setError("All fields are required");
      setData(null);
      return;
    }
    if (principal <= 0 || interest<= 0 || tenure <= 0){
      setError("Values must be greater than zero");
      setData(null);
      return;
    }

    // formula

    const p = Number(principal);
    const r  = Number(interest) / 12 / 100;
    const n = Number(tenure);

    const numerator = p * r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;

    const emiValue = numerator / denominator;

    const totalPayable =  emiValue * n;
    
    const interestPayable = totalPayable  - p;

    setData(emiValue.toFixed(2));
    setTotalAmount(totalPayable.toFixed(2));
    setTotalInterest(interestPayable.toFixed(2));
    setError("");

  };

  const handleReset = () =>{
    setFormData({principal:"",interest:"",tenure:""})
    setError("");
    setData(null);
    setTotalAmount(null);
    setTotalInterest(null);
  };

  return (
    <div className='main'>
      <form onSubmit={handleSubmit} >
        <h2>EMI Calculator</h2>

        {error && <p className='error'>{error}</p>}

      <label>Principal</label>
      <input type="number" name="principal" value={principal} onChange={handleChange}/><br />
      <label>Interest Rate</label>
      <input type="number" name="interest" value={interest} onChange={handleChange} /><br />
      <label>Tenure</label>
      <input type="number"name="tenure" value={tenure} onChange={handleChange} /><br />
      <div className='btn-group'>
        <button type='submit'>Calculate</button>
        <button type="button" onClick={handleReset} className='reset'>Reset</button>
      </div>
      
      </form>

      

      {data && (<div className='output'>
        <p><strong>Monthly EMI: </strong>Rs. {data}</p>
        
        <p><strong>Total Interest:</strong> ₹ {totalInterest}</p>
    <p><strong>Total Payable:</strong> ₹ {totalAmount}</p>
<br />
    <div className="chart">
      <PieChart
        principal={Number(principal)}
        interest={Number(totalInterest)}
      />
    </div>
      </div>)}

      
    </div>
  )
}

export default Calculator
