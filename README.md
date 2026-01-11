

# 🛡️ SafarGuardia: Women's Safety in Mumbai Locals

A specialized web-based safety prototype designed for women commuters in Mumbai. Created for the Smart India Hackathon (SIH). This project focuses on real-time crowd analytics and community-driven safety alerts for the Mumbai Local train network.


## 📌 Project Overview

**SafarGuardia** is a frontend prototype developed for the **Smart India Hackathon (SIH)**. Built using **HTML, CSS, React Js and JavaScript**, it addresses the specific security challenges women face during late-night travel in local trains. It combines standard safety tools with innovative features like compartment density analysis and station-wise safety indices.

## 🎯 Project Objective

The main objective is to provide women with **predictive safety data** allowing them to know which stations are safe to deboard and ensuring they are never truly alone in a compartment through AI-simulated constable requests.

---

## 🛠 Technologies Used

* **Frontend:** HTML5, CSS3 (Modern UI with Soft Shadows)
* **Logic:** JavaScript (ES6+)
* **Maps:** Leaflet.js / OpenStreetMap (for Safe Spots)
* **Animations:** CSS Keyframes & Transitons
* **Data Handling:** Browser LocalStorage (Mock Database)
* **Design:** Google Fonts (Montserrat/Poppins)

---

## 🌟 Key Features & Innovation

### 🚀 Unique SIH Features

* **Station-wise Crowd Prediction:** A color-coded safety index (🟢 Safe, 🟡 Moderate, 🔴 Unsafe) for every station on a selected route to guide late-night commuters.
* **Compartment Analysis:** Users can upload a photo of their coach. A simulated AI logic analyzes the crowd and offers a "Request Constable" button if the area is deserted.
* **Community Feedback Portal:** A women-only forum to post safety complaints with an upvote/downvote system to verify legitimacy and auto-hide spam.
* **Aadhaar-based Verification:** Simulated secure onboarding to ensure the platform remains a dedicated space for women.

### 🛡️ Standard Safety Features

* **One-Tap SOS Alert:** Immediate emergency trigger for high-stress situations.
* **Guardian Updates:** Automated real-time alerts sent to trusted contacts.
* **Nearby Safe Spots:** Interactive map showing the nearest Police Stations and Hospitals.
* **Fake Call:** A tool to simulate an incoming call to discourage potential harassers.

---

## 🗂 Project Structure

```text
/women-safety-app
│── animation.html      # Splash screen & Train animations
│── login.html          # Aadhaar-based secure login
│── signup.html         # User registration
│── index.html          # Main feature dashboard
│── crowd.html          # Route & Crowd Prediction index
│── compartment.html    # AI Analysis simulation
│── feedback.html       # Community portal & Report generator
│── css/style.css       # Global aesthetics
│── js/script.js        # Core logic & Mock data handling

```

---

## ▶ How to Run the Project

1. **Clone the Repository:**
```bash
git clone https://github.com/your-username/SafarGuardia.git

```
2. **Running the code:**

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

---

## 🚀 Future Enhancements

* **Real-time CCTV Integration:** Connecting with Railway API for live feed analysis.
* **Panic Button Hardware:** Bluetooth integration with physical wearable devices.
* **Government Dashboard:** A dedicated portal for Railway Police (RPF) to monitor real-time complaints.
* **Multi-lingual Support:** Marathi and Hindi interface for wider accessibility.

---

## 📄 Conclusion

**SafarGuardia** demonstrates how simple frontend technologies combined with smart logic can solve critical safety issues. By focusing on the unique ecosystem of Mumbai Locals, it provides a tailored solution for the "Lifeline of Mumbai."

---
👩‍💻 Team SafarGuardia
This project was developed for the Smart India Hackathon 2025.

