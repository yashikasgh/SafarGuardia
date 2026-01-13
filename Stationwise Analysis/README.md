
# Mumbai Local Station Wise Analysis 🚉

## 🛠️ Tech Stack
* **Backend:** Python, Flask, Pandas (Data Wrangling)
* **Frontend:** JavaScript (ES6+), HTML5, CSS3
* **Data Viz:** Chart.js
* **Data Source:** CSV-based Relational Data

## 🚀 Key Features
* Real-time Analytics: Visualizes safety vs. crowd levels using dual-axis charts.
* Smart Search: Custom autocomplete for quick station selection.
* REST API: Dedicated endpoints for station lists and time-series analysis.
* Data Processing: Efficient CSV parsing and hourly data grouping via Pandas.

## 💻 Setup
* Install dependencies: 
```pip install flask pandas```
* Run the app: 
```python app.py```
* Access: 
```http://127.0.0.1:5001```

## 📊 API Endpoints
* ```GET /api/stations```: Returns a list of all available stations.
* ```GET /api/station_analysis?name={station_name}```: Returns 24-hour safety and crowd data for a specific station.
