# TrustLens 🔍📄  
### GenAI-Powered Financial Document Analyzer

TrustLens is a **full-stack GenAI application** that analyzes financial documents such as **loan agreements and contracts** to identify **risk factors, unfavorable clauses, and overall risk level**.  
It extracts text from PDFs and uses **AWS Bedrock (Claude 3 Sonnet)** to generate structured insights including a **risk score, pros, cons, and a human-readable summary**.

---

## 🚀 Features

- Upload and analyze PDF financial documents
- AI-generated **risk score (0–100)** with risk level
- Identification of **high-risk clauses**
- Clear **pros and cons** breakdown
- Simple-language summary for easy understanding
- Fully serverless backend
- Clean and responsive frontend UI

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- HTML, CSS (custom styling)
- Fetch API

### Backend
- AWS Lambda (Node.js 20)
- AWS API Gateway (HTTP API)
- AWS Bedrock (Claude 3 Sonnet)
- pdfjs-dist (PDF text extraction)
- IAM (role-based access control)


---

## 🖥️ Demo Workflow

1. Upload a PDF document (loan agreement / contract)
2. Frontend converts PDF to Base64
3. API Gateway forwards request to Lambda
4. Lambda extracts text from PDF
5. Claude AI analyzes the document
6. Structured risk analysis is returned and displayed

---

## 📦 API Endpoint

**POST** `/analyze`

**Request Body**
```json
{
  "documentType": "loan_agreement",
  "fileName": "sample.pdf",
  "fileBase64": "<base64-encoded-pdf>"
}
```
**Response**
```json
{
  "documentType": "loan_agreement",
  "fileName": "sample.pdf",
  "analysis": {
    "riskScore": 95,
    "riskLevel": "High",
    "pros": [],
    "cons": [...],
    "summary": "..."
  }
}
```
---

## 🔐 Security & Privacy

1.No documents are stored permanently
2.Analysis is performed in-memory
3.No user data is persisted
4.API keys and credentials are never exposed 

---

## ⚠️ Disclaimer
TrustLens is an AI-powered analysis tool and does not provide legal or financial advice.
The results should be used for informational purposes only.  

---

## 👨‍💻 Author
Built by Rohit Rathod
📍 Full-stack / Backend Developer
🌐 Interested in Cloud, GenAI, and scalable systems
