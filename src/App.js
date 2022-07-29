import './App.css';
import { MonthBillsForm } from './monthBillsForm';


function App() {
  const rates = { weekday: 5.32, weekend: 10.99 }
  const name = "Mark"
  return (
    <div className="App">
      <header className="App-header">
        <h2>{name}'s monthly bill</h2>
        <MonthBillsForm name={name} rates={rates}></MonthBillsForm>
      </header>
    </div>
  );
}

export default App;
