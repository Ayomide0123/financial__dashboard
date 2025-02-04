import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Login from './component/Login'
import Register from "./component/Register";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    {/* <Login /> */}
    </BrowserRouter>
  )
}

export default App
