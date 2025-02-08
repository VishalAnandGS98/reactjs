import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import LoginPage from './components/login';
import Main from './components/main';


function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<Navigate to="/login" replace />}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/eismain' element={<Main/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
