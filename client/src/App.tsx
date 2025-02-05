import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import './App.css'
import Login from './component/Login'
import Register from "./component/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute ";

function App() {

  return (
    <BrowserRouter>
    <Routes>
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        {/* Redirect all other routes to login (optional) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />





      {/* <Route path="/" element={<Dashboard />} /> */}
    </Routes>
    {/* <Login /> */}
    </BrowserRouter>
  )
}

export default App
