import './App.css';
import { HoursInputRow as HoursInputRow } from './singleBillForm';
import { getBillsByCarerName, getPaymentLists, getRates } from './firestore';
import { formatDateToString, getAllDaysInMonth} from './Dates'
import { MonthBillsForm } from './monthBillsForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
            <MonthBillsForm name="Jerry" rate="5"></MonthBillsForm>
      </header>
    </div>
  );
}

export default App;
