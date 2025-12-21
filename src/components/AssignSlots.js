import axios from "axios";
import { useState } from "react";

const PatientPortal = () => {
  // --- States ---
  const [patientData, setPatientData] = useState({
    patientId: "", name: "", email: "", phone: "", age: "", gender: ""
  });
  const [patientCreated, setPatientCreated] = useState(false);
  const [loadingPatient, setLoadingPatient] = useState(false);
  const [errorPatient, setErrorPatient] = useState("");

  const [consultationData, setConsultationData] = useState({
    patientId: "", doctorId: "", consultationDate: ""
  });
  const [loadingConsultation, setLoadingConsultation] = useState(false);
  const [errorConsultation, setErrorConsultation] = useState("");

  const [statusData, setStatusData] = useState({ patientId: "", doctorId: "" });
  const [consultationStatus, setConsultationStatus] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");

  // --- Theme Styles ---
  const styles = {
    wrapper: {
      backgroundColor: "#f1f5f9",
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
    },
    header: {
      marginBottom: "2rem",
      textAlign: "center",
    },
    title: { fontSize: "2rem", fontWeight: "800", color: "#0f172a" },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "2rem",
      alignItems: "start",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e2e8f0",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      marginBottom: "1rem",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      fontSize: "0.95rem",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "0.8rem",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    error: {
      backgroundColor: "#fef2f2",
      color: "#b91c1c",
      padding: "0.75rem",
      borderRadius: "6px",
      fontSize: "0.85rem",
      marginBottom: "1rem",
    },
    success: {
      backgroundColor: "#f0fdf4",
      color: "#15803d",
      padding: "1rem",
      borderRadius: "8px",
      fontWeight: "600",
      textAlign: "center",
      border: "1px solid #bbf7d0"
    }
  };

  // --- Handlers ---
  const handlePatientChange = (e) => setPatientData({ ...patientData, [e.target.name]: e.target.value });
  const handleConsultationChange = (e) => setConsultationData({ ...consultationData, [e.target.name]: e.target.value });
  const handleStatusChange = (e) => setStatusData({ ...statusData, [e.target.name]: e.target.value });

  const handleCreatePatient = async (e) => {
    e.preventDefault();
    try {
      setLoadingPatient(true);
      setErrorPatient("");
      await axios.post("http://localhost:5000/api/patient", patientData);
      setPatientCreated(true);
      setConsultationData({ ...consultationData, patientId: patientData.patientId });
    } catch (err) {
      setErrorPatient("Failed to create patient. ID might exist.");
    } finally { setLoadingPatient(false); }
  };

  const handleApplyConsultation = async (e) => {
    e.preventDefault();
    try {
      setLoadingConsultation(true);
      setErrorConsultation("");
      await axios.post("http://localhost:5000/api/consultation/apply", consultationData);
      alert("Application submitted!");
    } catch (err) {
      setErrorConsultation("Application failed. Check IDs.");
    } finally { setLoadingConsultation(false); }
  };

  const handleCheckStatus = async () => {
    try {
      setLoadingStatus(true);
      setErrorStatus("");
      const res = await axios.get("http://localhost:5000/api/consultation/status", { params: statusData });
      setConsultationStatus(res.data?.status || "No record found");
    } catch (err) {
      setErrorStatus("Could not fetch status.");
    } finally { setLoadingStatus(false); }
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        .input-field:focus { border-color: #2563eb !important; outline: none; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
        .btn-primary:hover { background-color: #1d4ed8 !important; }
        .btn-primary:disabled { background-color: #94a3b8 !important; cursor: not-allowed; }
      `}</style>

      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Med<span style={{color: "#2563eb"}}>Sync</span> Patient Portal</h1>
          <p style={{color: "#64748b"}}>Register, Book, and Track your medical consultations.</p>
        </header>

        <div style={styles.grid}>
          
          {/* Section 1: Registration */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>1. Registration</h2>
            {patientCreated ? (
              <div style={styles.success}>
                ✅ ID Created: {patientData.patientId} <br/>
                <small>Proceed to Consultation</small>
              </div>
            ) : (
              <form onSubmit={handleCreatePatient}>
                {errorPatient && <div style={styles.error}>{errorPatient}</div>}
                <input className="input-field" style={styles.input} type="text" name="patientId" placeholder="Choose a Patient ID" onChange={handlePatientChange} required />
                <input className="input-field" style={styles.input} type="text" name="name" placeholder="Full Name" onChange={handlePatientChange} required />
                <input className="input-field" style={styles.input} type="email" name="email" placeholder="Email Address" onChange={handlePatientChange} required />
                <input className="input-field" style={styles.input} type="text" name="phone" placeholder="Phone Number" onChange={handlePatientChange} required />
                <div style={{display: "flex", gap: "10px"}}>
                   <input className="input-field" style={styles.input} type="number" name="age" placeholder="Age" onChange={handlePatientChange} />
                   <select className="input-field" style={styles.input} name="gender" onChange={handlePatientChange}>
                     <option value="">Gender</option>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                   </select>
                </div>
                <button type="submit" disabled={loadingPatient} className="btn-primary" style={styles.button}>
                  {loadingPatient ? "Registering..." : "Create Account"}
                </button>
              </form>
            )}
          </div>

          {/* Section 2: Booking */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>2. Book Appointment</h2>
            <form onSubmit={handleApplyConsultation}>
              {errorConsultation && <div style={styles.error}>{errorConsultation}</div>}
              <input className="input-field" style={styles.input} type="text" name="patientId" placeholder="Patient ID" value={consultationData.patientId} onChange={handleConsultationChange} required />
              <input className="input-field" style={styles.input} type="text" name="doctorId" placeholder="Doctor ID" onChange={handleConsultationChange} required />
              <input className="input-field" style={styles.input} type="date" name="consultationDate" onChange={handleConsultationChange} required />
              <button type="submit" disabled={loadingConsultation} className="btn-primary" style={styles.button}>
                {loadingConsultation ? "Booking..." : "Book Consultation"}
              </button>
            </form>
          </div>

          {/* Section 3: Tracking */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>3. Live Status</h2>
            {errorStatus && <div style={styles.error}>{errorStatus}</div>}
            <input className="input-field" style={styles.input} type="text" name="patientId" placeholder="Patient ID" onChange={handleStatusChange} />
            <input className="input-field" style={styles.input} type="text" name="doctorId" placeholder="Doctor ID" onChange={handleStatusChange} />
            <button onClick={handleCheckStatus} disabled={loadingStatus} className="btn-primary" style={styles.button}>
              {loadingStatus ? "Syncing..." : "Check My Status"}
            </button>
            {consultationStatus && (
              <div style={{...styles.success, marginTop: "1rem", backgroundColor: "#eff6ff", color: "#1e40af", borderColor: "#bfdbfe"}}>
                Status: <strong>{consultationStatus}</strong>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientPortal;