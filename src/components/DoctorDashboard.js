import axios from "axios";
import { useCallback, useState } from "react";
import PatientList from "./PatientList";

const DoctorDashboard = () => {
  const [doctorId, setDoctorId] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Doctor Creation State ---
  const [newDoctor, setNewDoctor] = useState({
    doctorId: "",
    name: "",
    email: "",
    specialization: ""
  });
  const [creatingDoctor, setCreatingDoctor] = useState(false);
  const [doctorError, setDoctorError] = useState("");

  const handleDoctorChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    try {
      setCreatingDoctor(true);
      setDoctorError("");
      const response = await axios.post("http://localhost:5000/api/doctor", newDoctor);
      
      alert("Doctor created successfully!");

      // Automatically set the new doctor's ID in the dashboard input
      setDoctorId(response.data.data.doctorId);

      // Clear the form
      setNewDoctor({ doctorId: "", name: "", email: "", specialization: "" });

      // Fetch patients immediately (should be empty initially)
      fetchPatients(response.data.data.doctorId);
    } catch (err) {
      console.error(err);
      setDoctorError("Failed to create doctor. Maybe ID or email already exists.");
    } finally {
      setCreatingDoctor(false);
    }
  };

  // --- Fetch Patients ---
  const fetchPatients = useCallback(async (id) => {
    const fetchId = id || doctorId;
    if (!fetchId.trim()) {
      setError("Please enter Doctor ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`http://localhost:5000/api/doctor/${fetchId}/patients`);
      setPatients(response.data);
    } catch (err) {
      console.error(err);
      setError("No data found for this Doctor ID");
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  const styles = {
    wrapper: { padding: "2rem", backgroundColor: "#f1f5f9", minHeight: "100vh", fontFamily: "'Inter', system-ui" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" },
    title: { fontSize: "1.8rem", fontWeight: "800", color: "#0f172a" },
    inputBox: { padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5f5", marginRight: "0.5rem", width: "180px" },
    loadBtn: { backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "0.6rem 1.2rem", borderRadius: "8px", fontWeight: "600", cursor: "pointer" },
    sectionTitle: { fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" },
    formInput: { display: "block", width: "250px", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5f5" },
    formBtn: { padding: "0.5rem 1rem", borderRadius: "6px", border: "none", backgroundColor: "#10b981", color: "#fff", cursor: "pointer" }
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>
          Med<span style={{ color: "#2563eb" }}>Sync</span> Portal
        </h1>

        <div>
          <input
            type="text"
            placeholder="Enter Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            style={styles.inputBox}
          />
          <button style={styles.loadBtn} onClick={() => fetchPatients()}>
            Load Dashboard
          </button>
        </div>
      </header>

      {/* --- Create Doctor Form --- */}
      <div style={{ marginBottom: "2rem", background: "#fff", padding: "1rem", borderRadius: "12px" }}>
        <h2 style={styles.sectionTitle}>Create New Doctor</h2>
        {doctorError && <div style={{ color: "#b91c1c", marginBottom: "0.5rem" }}>{doctorError}</div>}
        <form onSubmit={handleCreateDoctor}>
          <input type="text" name="doctorId" placeholder="Doctor ID" value={newDoctor.doctorId} onChange={handleDoctorChange} style={styles.formInput} required />
          <input type="text" name="name" placeholder="Full Name" value={newDoctor.name} onChange={handleDoctorChange} style={styles.formInput} required />
          <input type="email" name="email" placeholder="Email" value={newDoctor.email} onChange={handleDoctorChange} style={styles.formInput} required />
          <input type="text" name="specialization" placeholder="Specialization" value={newDoctor.specialization} onChange={handleDoctorChange} style={styles.formInput} required />
          <button type="submit" style={styles.formBtn} disabled={creatingDoctor}>
            {creatingDoctor ? "Creating..." : "Create Doctor"}
          </button>
        </form>
      </div>

      {/* Stats */}
      <div style={{ marginBottom: "1.5rem" }}>
        <strong>Total Appointments:</strong> {loading ? "..." : patients.length}
      </div>

      {/* Errors */}
      {error && <div style={{ background: "#fee2e2", padding: "1rem", borderRadius: "8px", color: "#b91c1c" }}>{error}</div>}

      {/* Patient List */}
      {!loading && patients.length > 0 && (
        <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
          <PatientList patients={patients} onRefresh={() => fetchPatients()} doctorId={doctorId} isDoctor={true} />
        </div>
      )}

      {loading && <p>Loading appointments...</p>}
    </div>
  );
};

export default DoctorDashboard;
