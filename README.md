# 🏥 Hospital Management System (MedSync)

A **Full Stack Hospital Management System** built to manage doctor availability, patient consultations, slot scheduling, and automated notifications using a modern **MERN architecture**, now featuring an **AI Medical Assistant**.

## 💫 Key Features

* **🤖 MedSync AI Assistant** – A smart, real-time medical chatbot integrated into the dashboard to assist doctors with instant queries.
* **🧑‍⚕️ Doctor & Patient Management** – Specialized tools for credential handling and patient record maintenance.
* **📅 Slot-based Scheduling** – Dynamic dashboard for assigning and viewing consultation timings.
* **📧 Automated Notifications** – Instant email updates for patients regarding their appointment status.
* **💬 Persistent Chat Interface** – Custom-styled AI chatbot accessible from every page within the application.

## 🏗 Architecture



### 💻 Frontend (React.js)
* **Functional Components**: Built with React Hooks for high performance and clean state management.
* **Persistent Layout**: Shared Navbar and AI Chatbot remain active across all application routes.
* **Dynamic Styling**: Clean, responsive UI with inline CSS for the AI components to ensure consistency.

### ⚙️ Backend (Node.js & Express)
* **RESTful APIs**: Organized endpoints for medical data CRUD operations.
* **AI Integration**: Direct, stable connection to **Google Gemini 1.5 Flash** for high-speed AI responses.
* **Automation**: Integrated Nodemailer for reliable hospital-to-patient communication.

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS, Inline-CSS Modules |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **AI Engine** | Google Gemini 1.5 Flash (API v1 Stable) |
| **Email** | Nodemailer |

## 📁 Project Structure

```text
root/
├── server/
│   ├── models/           # Contains chatbotapi.js (AI logic)
│   ├── routes/           # API Endpoint definitions
│   └── index.js          # Entry point for backend
└── doctor-dashboard/     # Frontend Application
    ├── src/
    │   ├── components/   # Chatbot.jsx (AI UI), Navbar.jsx, Dashboard components
    │   └── App.js        # Main layout and persistent routing
    └── package.json
```
🚀 How to Run Locally
1️⃣ Clone Repository
Bash

git clone [https://github.com/sau240/chal-be.git](https://github.com/sau240/chal-be.git)
cd HospitalManagement
2️⃣ Backend Setup
Bash

cd server
npm install
# Create a .env file and add:
# GEMINI_KEY=your_google_api_key_here
node index.js
3️⃣ Frontend Setup
Bash

cd doctor-dashboard
npm install
npm start
📸 Preview
<img width="100%" src="https://github.com/user-attachments/assets/d72b94c0-913b-4497-926b-e56ec2d0cffa" />

Developed by Saurav 📧 sv695177@gmail.com | 💼 LinkedIn
