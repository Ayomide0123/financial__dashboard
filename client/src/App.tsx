import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Login from './component/Login'
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
    {/* <Login /> */}
    </BrowserRouter>
  )
}

export default App
