import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Import components
import AssignSlots from "./components/AssignSlots";
import DoctorDashboard from "./components/DoctorDashboard";
import Navbar from "./components/navbar";
import PatientList from "./components/PatientList";

function App() {
  // Hardcoded doctorId for now (you can integrate auth later)
  const doctorId = "DOC102";

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        {/* Navbar for navigation */}
        <Navbar />

        {/* Routes */}
        <div className="p-6">
          <Routes>
            <Route
              path="/"
              element={<DoctorDashboard doctorId={doctorId} />}
            />

            <Route
              path="/assign-slot"
              element={<AssignSlots doctorId={doctorId} />}
            />

            <Route
              path="/patients"
              element={<PatientList doctorId={doctorId} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
