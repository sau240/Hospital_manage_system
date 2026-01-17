import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Import components
import AssignSlots from "./components/AssignSlots";
import DoctorDashboard from "./components/DoctorDashboard";
import Navbar from "./components/navbar";
import PatientList from "./components/PatientList";
import Chatbot from "./components/Chatbot"; 

function App() {
  const doctorId = "DOC102";

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50 relative">
        <Navbar />

        {/* Content Area */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DoctorDashboard doctorId={doctorId} />} />
            <Route path="/assign-slot" element={<AssignSlots doctorId={doctorId} />} />
            <Route path="/patients" element={<PatientList doctorId={doctorId} />} />
          </Routes>
        </div>

        {/* Chatbot sits here - independent of the URL/Routes */}
        <Chatbot /> 
      </div>
    </Router>
  );
}

export default App;