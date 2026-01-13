# AI-Powered Compartment Safety Monitor 👁️🚨
A Computer Vision-based safety module for Mumbai Local trains. It utilizes YOLOv8 to analyze compartment occupancy via image uploads and triggers automated constable assistance alerts based on real-time crowd density.

## 🛠️ Tech Stack
* **AI/ML:** YOLOv8 (Ultralytics), NumPy
* **Backend:** Python (Flask), Flask-CORS
* **Data Persistence:** JSON-based Alert Logging
* **Processing:** CPU/GPU-accelerated Image Inference

## 🚀 Key Features
* **Automated Person Detection:** Uses a pre-trained YOLOv8 Nano model to identify and count commuters in uploaded images.
* **Safety Logic Engine:**
 ```< 5 People```: High Alert (Constable Dispatched).
```5-10 People```: Warning (Constable Requested).
```> 10 People```: Normal/Crowded (Request Rejected).
## 💻 Setup & Execution
1. Install Requirements:
```pip install flask flask-cors ultralytics numpy```
2. Run Server:
   ```python app.py```
3. API Usage:
   * Endpoint: ```POST /analyze```

## 📂 Data Structure
* Safety violations are logged in ```alerts.json```, storing timestamps, detection results, and reference paths to the processed images stored in ```/uploads.```
