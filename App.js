import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const currencySymbols = {
  USD: '$',
  EUR: '€',
  INR: '₹',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
};

const LoanCalculator = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const calculateEMI = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const years = parseInt(term);

    if (!principal || !annualRate || !years) {
      alert('Please enter valid numbers');
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    setMonthlyPayment(emi.toFixed(2));

    let balance = principal;
    const scheduleList = [];

    for (let i = 1; i <= totalMonths; i++) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      balance -= principalPaid;

      scheduleList.push({
        month: i,
        principal: principalPaid.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance.toFixed(2),
      });
    }

    setSchedule(scheduleList);
  };

  const reset = () => {
    setAmount('');
    setRate('');
    setTerm('');
    setMonthlyPayment(null);
    setSchedule([]);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Loan Calculator Dashboard</h2>

      <div className="row g-3">
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Loan Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Interest Rate (%)"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Term (Years)"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {Object.keys(currencySymbols).map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-primary" onClick={calculateEMI}>
          CALCULATE
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          RESET
        </button>
      </div>

      {monthlyPayment && (
        <div className="mt-4">
          <h4>
            Monthly EMI: <span className="text-success">{currencySymbols[currency]}{monthlyPayment}</span>
          </h4>
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Month</th>
                  <th>Principal ({currency})</th>
                  <th>Interest ({currency})</th>
                  <th>Remaining Balance ({currency})</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td>{currencySymbols[currency]}{row.principal}</td>
                    <td>{currencySymbols[currency]}{row.interest}</td>
                    <td>{currencySymbols[currency]}{row.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;