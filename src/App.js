import './App.css';
import { CarerBillingPage } from './Carer/CarerBillingPage';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { SingleCarerBill } from './Manager/SingleCarerBill';
import { AllCarerBills } from './Manager/AllCarerBills';
import { ControlCenter } from './Manager/ControlCenter';


function App() {
  const nameIds = ["py8BefwPq8", "iuTcz1Kgjn", "5Q9wneJOST", "ff9lbEHFHx", "PYQACrShek"]
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/billing/:nameId" element={<CarerBillingPage/>} />
            <Route path="/control" element={<ControlCenter/>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
