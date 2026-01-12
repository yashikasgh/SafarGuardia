import os, time, json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ultralytics import YOLO
import numpy as np

UPLOAD_FOLDER = "uploads"
ALERTS_FILE = "alerts.json"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
if not os.path.exists(ALERTS_FILE):
    with open(ALERTS_FILE, "w") as f:
        json.dump([], f)

app = Flask(__name__, static_folder="static", static_url_path="/")
CORS(app)

print("Loading YOLO model (yolov8n)... this may take a moment the first time.")
model = YOLO("yolov8n.pt") 
print("Model loaded.")

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/admin")
def admin_page():
    return app.send_static_file("admin.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    """
    Expects multipart/form-data:
      - image file field name: 'image'
      - optional form fields: 'train', 'compartment', 'lat', 'lon'
    Returns JSON: {'people_count': int, 'status': 'safe|unsafe|reject', 'message': str, 'alert_id': id}
    """
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    file = request.files["image"]
    train = request.form.get("train", "")
    compartment = request.form.get("compartment", "")
    lat = request.form.get("lat", "")
    lon = request.form.get("lon", "")

    # save uploaded file
    ts = int(time.time())
    filename = f"{ts}_{file.filename.replace(' ', '_')}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # run YOLO
    results = model(filepath)
    r = results[0]

    # extract class ids robustly
    class_ids = []
    try:
        cls_attr = r.boxes.cls
        class_ids = cls_attr.cpu().numpy().astype(int).tolist()
    except Exception:
        class_ids = []

    # count persons (COCO class id 0)
    people_count = int(np.array(class_ids).tolist().count(0)) if len(class_ids) else 0

    # decision logic
    if people_count < 5:
        status = "unsafe"
        message = f"🚨 Unsafe: Only {people_count} person(s). Constable dispatched."
    elif 5 <= people_count <= 10:
        status = "unsafe"
        message = f"⚠️ Unsafe: {people_count} people. Constable requested."
    else:
        status = "reject"
        message = f"❌ Crowded: {people_count} people. Request rejected."

    # save alert metadata
    alert = {
        "id": ts,
        "time": ts,
        "train": train,
        "compartment": compartment,
        "lat": lat,
        "lon": lon,
        "people_count": people_count,
        "status": status,
        "message": message,
        "image": filename
    }
    with open(ALERTS_FILE, "r+") as f:
        data = json.load(f)
        data.insert(0, alert)
        f.seek(0)
        json.dump(data, f, indent=2)

    # return response
    return jsonify({
        "people_count": people_count,
        "status": status,
        "message": message,
        "alert_id": ts
    })

@app.route("/alerts", methods=["GET"])
def get_alerts():
    with open(ALERTS_FILE) as f:
        data = json.load(f)
    return jsonify(data)

@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
