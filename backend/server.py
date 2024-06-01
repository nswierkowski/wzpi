from flask import Flask, jsonify
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/current_time')
def get_current_time():
    now = datetime.now()
    end_of_semester = datetime(now.year, 6, 26, 23, 59, 59)
    
    time_difference = end_of_semester - now
    days, seconds = time_difference.days, time_difference.seconds
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    seconds = seconds % 60

    return jsonify({
        'current_time': now.strftime('%Y-%m-%d %H:%M:%S'),
        'time_to_end_of_semester': f"{days} days, {hours} hours, {minutes} minutes, {seconds} seconds"
    })

if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5000, debug=True)
