// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import Welcome from "./pages/welcome";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position='top-center'/>
        
        <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/Home' element={<Home />} />
          {/*<Route path='/' element={<Home />} />*/}
          <Route path='/addContact' element={<AddEdit />} />
          <Route path='/update/:id' element={<AddEdit />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
