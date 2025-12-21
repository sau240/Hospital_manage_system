import axios from "axios";
import { useState } from "react";
import AssignSlots from "./AssignSlots";

const PatientList = ({ patients = [], onRefresh, isDoctor = false, doctorId }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const handleApply = async (patient) => {
    try {
      setLoadingId(patient._id);

      await axios.post("http://localhost:5000/api/consultation/apply", {
        doctorId,
        patientName: patient.name || patient.patientName,
        patientEmail: patient.email || patient.patientEmail,
        consultationDate: new Date().toISOString().split("T")[0],
      });

      onRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to apply for consultation");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
        Appointments
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f1f5f9" }}>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>Date</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>Slot</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                No patients found
              </td>
            </tr>
          ) : (
            patients.map((item) => {
              const status = item.status || "PENDING";

              return (
                <tr key={item._id}>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{item.patientName}</td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{item.patientEmail}</td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{item.consultationDate || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>{item.slotNumber || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "6px",
                        backgroundColor:
                          status === "CONFIRMED" ? "#d1fae5" : status === "PENDING" ? "#fef3c7" : "#e5e7eb",
                        color:
                          status === "CONFIRMED" ? "#065f46" : status === "PENDING" ? "#78350f" : "#374151",
                      }}
                    >
                      {status}
                    </span>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    {!isDoctor && status === "PENDING" && (
                      <button
                        onClick={() => handleApply(item)}
                        disabled={loadingId === item._id}
                        style={{
                          padding: "0.3rem 0.6rem",
                          backgroundColor: "#2563eb",
                          color: "#fff",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {loadingId === item._id ? "Applying..." : "Apply"}
                      </button>
                    )}

                    {isDoctor && status === "PENDING" && (
                      <button
                        onClick={() => setSelectedPatient(item)}
                        style={{
                          padding: "0.3rem 0.6rem",
                          backgroundColor: "#9333ea",
                          color: "#fff",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Assign Slot
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {selectedPatient && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <AssignSlots
            consultationId={selectedPatient._id}
            patientName={selectedPatient.patientName}
            currentSlot={selectedPatient.slotNumber}
            onSuccess={() => {
              onRefresh();
              setSelectedPatient(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PatientList;
