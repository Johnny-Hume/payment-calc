import './App.css';
import { CarerBillingPage } from './CarerBillingPage';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'


function App() {
  const nameIds = ["py8BefwPq8", "iuTcz1Kgjn", "5Q9wneJOST", "ff9lbEHFHx", "PYQACrShek"]
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/:nameId" element={<CarerBillingPage/>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
