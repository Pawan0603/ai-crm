# 🚀 AI-First CRM – HCP Interaction Module

## 🧠 Overview

This project is an **AI-first CRM system** designed for logging interactions with Healthcare Professionals (HCPs).
It enables users (field representatives) to record interactions using either a **structured form** or an **AI-powered chat interface**.

The system leverages **LLMs and an agent-based architecture** to convert unstructured conversation into structured CRM data.

---

## ✨ Key Features

### 📝 Manual Interaction Logging

* Structured form to capture:

  * HCP Name
  * Interaction Type (Meeting/Call)
  * Date & Time
  * Topics Discussed
  * Outcomes
  * Follow-ups
  * Sentiment

### 🤖 AI-Powered Logging

* Users can describe interactions in natural language
* AI automatically:

  * Extracts structured data
  * Determines sentiment
  * Suggests follow-ups
  * Auto-fills the form

### 🧩 Agent-Based Architecture

* AI agent decides which tool to use dynamically
* Modular and scalable design

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Redux Toolkit
* Tailwind CSS

### Backend

* FastAPI (Python)
* Groq LLM (`llama-3.3-70b-versatile`)
* LangGraph-style agent system

### Other

* Axios (API calls)
* Python-dotenv (env management)

---

## 🧠 AI & Agent Flow

1. User enters natural language input
2. Request sent to `/interaction/agent`
3. LLM processes input and returns structured JSON
4. Agent selects appropriate tool:

   * `log_interaction`
   * `edit_interaction`
   * `suggest_followup`
   * `summarize`
   * `get_hcp_details`
5. Data returned to frontend
6. Form auto-populated in real-time

---

## 📦 Project Structure

```
ai-crm/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│
├── backend/
│   ├── main.py
│   ├── routes/
│   ├── services/
│   │   ├── ai.py
│   │   └── agent.py
│   ├── schemas/
│   └── .env
```

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

pip install fastapi uvicorn groq python-dotenv langgraph
```

Create `.env` file:

```
GROQ_API_KEY=your_api_key_here
```

Run server:

```bash
uvicorn main:app --reload
```

---

### 🔹 Frontend Setup

```bash
cd frontend
pnpm install
pnpm dev
```

---

## 🔗 API Endpoints

### ➤ Save Interaction (Manual)

```
POST /interaction/save
```

### ➤ AI Extraction (Basic)

```
POST /interaction/ai
```

### ➤ AI Agent (Main Feature)

```
POST /interaction/agent
```

---

## 🧪 Sample Test Input

```
Met Dr. Rajesh Sharma at City Hospital on 25 April at 3:30 PM. 
We had a detailed discussion about our new oncology drug OncoX and its Phase III results. 
Dr. Sharma showed strong interest and had a positive response towards the product. 

Also discussed pricing concerns and competitor comparison. 
Shared product brochure and clinical trial documents. 
Distributed 5 sample units for initial trial.

Attendees included Dr. Sharma and his assistant Dr. Mehta. 

Outcome: Doctor agreed to consider prescribing OncoX for eligible patients.

Follow-up: Schedule a follow-up meeting next week and send additional research data via email.
```

---

## 🧠 Challenges & Solutions

### ❌ Issue: LLM returned invalid JSON

**Solution:**
Implemented a **regex-based JSON extraction layer** to safely parse structured output.

---

### ❌ Issue: CORS errors

**Solution:**
Configured FastAPI CORS middleware to allow frontend communication.

---

## 🚀 Future Improvements

* Database integration (PostgreSQL)
* Authentication system
* Chat history persistence
* Advanced LangGraph workflows
* Role-based access control

---

## 👨‍💻 Author

Developed by: **Pawan Thakre**

---

## ⭐ Conclusion

This project demonstrates how AI can be integrated into real-world CRM workflows to automate repetitive tasks and improve productivity using intelligent systems.
