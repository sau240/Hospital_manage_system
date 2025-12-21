<img width="3999" height="2615" alt="image" src="https://github.com/user-attachments/assets/d72b94c0-913b-4497-926b-e56ec2d0cffa" />


**🏗 Architecture**
OverviewThe project follows a decoupled Client-Server architecture to ensure scalability and ease of maintenance.💻 Frontend (React.js)Interactive UI: Built with functional components and React Hooks (useState, useCallback).
**Key Components:**
**DoctorDashboard:** Central hub for doctor activity and ID generation.
**PatientList:** Real-time display of patient queues and appointment statuses.
**AssignSlots:** A streamlined modal interface for scheduling.
**Networking:** API communication handled via Axios with integrated error handling.

**⚙️ Backend (Node.js & Express)RESTful API:**
Structured endpoints for CRUD operations on doctors, patients, and slots.
**Communication:** Integrated Nodemailer for automated transactional emails.
**Data Modeling:** Mongoose schemas ensure data integrity and type safety for MongoDB.🗄 Database (MongoDB)Doctor Schema: Tracks credentials, specializations, and availability status.Consultation Schema: Links doctors and patients with specific time slots and statuses.

**🛠 Tools & TechnologiesLayerTechnologyPurposeFrontendReact.js**
Component-based UIBackendNode.js /
ExpressServer-side logic & 
APIDatabaseMongoDBNoSQL document storageODMMongooseSchema-based data 
modelingMailingNodemailerAutomated email notificationsRequestAxiosFrontend-to-Backend HTTP requests


**📁 Project StructurePlaintextroot/**
├── server/                 # Backend logic
│   ├── routes/             # API Endpoints
│   ├── models/             # Mongoose Schemas
│   ├── utils/              # Helper functions (Email, etc.)
│   └── server.js           # Entry point
└── client/                 # Frontend logic
    ├── src/
    │   ├── components/     # Reusable UI elements
    │   └── DoctorDashboard.js
    └── package.json
    
**⚡ Key Features✅ Doctor Management:** 
Create and toggle active status for medical staff.
**🩺 Patient Workflow:** Easy registration and consultation application process.
**📅 Slot Assignment:** Intuitive dashboard for doctors to confirm time slots.
**📧 Auto-Notifications:** Instant email alerts to patients upon slot confirmation.
**📊 Status Tracking:** Real-time updates on consultation progress.
**🚀 How to Run LocallyPrerequisitesNode.js** (v14+)MongoDB installed and runningGit1. 

**Clone the RepositoryBashgit clone https://github.com/your-username/your-repo-name.git
**cd your-repo-name
2. Setup BackendBashcd server
npm install
# Ensure your MongoDB URI is configured in server.js or a .env file
node server.js
3. Setup FrontendBashcd client

npm install
npm start

**📧 ContactDeveloped by Saurav.**

For queries, contributions, or feedback,
please reach out via:Email: sv695177@gmail.com
