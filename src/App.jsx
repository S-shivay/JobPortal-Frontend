import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import { Toaster } from "react-hot-toast";
import Create from "./pages/create";
import { Job } from "./pages/job";

function App() {
  

  return (
    <>
      <Toaster/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/new" element={<Create/>}/>
    <Route path="/job/:id" element={<Job/>}/>
    <Route path="/edit/:id" element={<Create/>}/>
    </Routes>
    </>
  )
}

export default App
