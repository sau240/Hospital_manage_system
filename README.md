# 🏥 Hospital Management System

A **Full Stack Hospital Management System** built to manage doctor availability, patient consultations, slot scheduling, and automated email notifications using a modern **MERN architecture**.

---

## 💫 About Project
This project simplifies hospital workflows by allowing doctors to manage consultations efficiently while keeping patients informed automatically.

- 🧑‍⚕️ Doctor & patient management
- 📅 Slot-based consultation scheduling
- 📧 Automated email notifications
- ⚡ Scalable client–server architecture

---

## 🏗 Architecture

### 💻 Frontend (React.js)
- Functional components with React Hooks
- Axios for API communication
- Clean and modular UI

**Key Components**
- **DoctorDashboard** – Doctor activity hub & ID generation
- **PatientList** – Displays patient queue & status
- **AssignSlots** – Slot assignment modal

---

### ⚙️ Backend (Node.js & Express)
- RESTful APIs for doctors, patients & consultations
- Nodemailer for automated emails
- Secure routing & validation

---

### 🗄 Database (MongoDB)
- NoSQL document storage
- Schema validation with Mongoose

**Schemas**
- **Doctor** – Credentials, specialization, availability
- **Consultation** – Patient, doctor, slot, status

---

## 💻 Tech Stack

### 🚀 Core
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/mongodb-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### 🛠 Tools
![Axios](https://img.shields.io/badge/axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)
![Mongoose](https://img.shields.io/badge/mongoose-880000?style=for-the-badge)
![Nodemailer](https://img.shields.io/badge/nodemailer-0A66C2?style=for-the-badge)
![Git](https://img.shields.io/badge/git-F05033?style=for-the-badge&logo=git&logoColor=white)

---

## 📁 Project Structure
```plaintext
root/
├── server/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   └── server.js
└── client/
    ├── src/
    │   ├── components/
    │   └── DoctorDashboard.js
    └── package.json

Key Features

✅ Doctor creation & availability control

🩺 Patient consultation workflow

📅 Slot assignment dashboard

📧 Automated email notifications

📊 Real-time consultation status

🚀 How to Run Locally
Prerequisites

Node.js (v14+)

MongoDB

Git

1️⃣ Clone Repository
git clone https://github.com/your-username/hospital-management-system.git
cd hospital-management-system

2️⃣ Backend Setup
cd server
npm install
node server.js

3️⃣ Frontend Setup
cd client
npm install
npm start

📸 Screenshot
<img width="100%" src="https://github.com/user-attachments/assets/d72b94c0-913b-4497-926b-e56ec2d0cffa" />
📬 Contact

Developed by Saurav

📧 Email: sv695177@gmail.com

💼 LinkedIn: https://linkedin.com/in/www.linkedin.com/in/saurav-rai-m-3a3861396

