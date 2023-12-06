import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditData";
import Icon from "./components/icon/icon.png";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar icon={Icon} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/editEmployee/:id" element={<EditEmployee />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
