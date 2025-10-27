# 🧪 A1 Hydrostatic Test Form Overview

## ✅ Purpose
The **A1 Hydrostatic Test Form** documents and verifies hydrostatic pressure tests performed on plumbing systems. It ensures code compliance and provides a digital record for technicians, inspectors, and customers.

## 📋 Included Fields
- **Customer Info**: Name, address, contact details  
- **Technician Info**: Name, license number, company  
- **Test Details**:
  - Date of test
  - Starting and ending pressure readings
  - Duration of test
  - Pass/Fail status  
- **System Info**:
  - Type of system tested (e.g., sewer, water)
  - Location of test (e.g., slab, yard, cleanout)
- **Notes/Observations**: Technician comments  
- **Signature Fields**: Technician and customer e-signatures  
- **Photo Uploads**: Optional image capture of gauge or setup

## 🌐 Platform & Usage
- **Type**: Web-based form  
- **Backend**: Supabase (auth, database, storage)  
- **Frontend**: HTML/CSS/JS hosted via Vercel  
- **Users**: Field technicians, office staff, inspectors  
- **Access**: Mobile-friendly, secure login via technician dashboard

## ⚙️ Setup & Dependencies
- Supabase project with relevant tables and storage buckets
- Vercel deployment for frontend
- Optional: Zapier or Supabase triggers for email notifications
- Optional: PDF export via browser print or serverless function

## 🖼️ Example Output
- Branded PDF report with logo, timestamp, and test results
- JSON record stored in Supabase for audit trail
- Screenshot of completed form with signatures and pressure readings

## 📤 Submission & Export
- **Submit**: Button triggers Supabase insert and optional email
- **Save**: Auto-save on field blur or manual “Save Draft”
- **Export**:
  - PDF via browser print or export button
  - CSV via Supabase dashboard or admin panel

---

> Built and maintained by [A-1 Affordable Plumbing Services](https://a-1apsvc.com)  
> For support or integration help, contact [Alpha Interface Marketing](https://alphaifm.com)
