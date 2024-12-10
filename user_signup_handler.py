from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

# Database connection configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'signup_db',
}

@app.route('/signup', methods=['POST'])
def signup():
    try:
        # Parse user data from request
        data = request.json
        username = data['username']
        email = data['email']
        password = data['password']

        # Connect to the database
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # Insert user into database
        query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
        cursor.execute(query, (username, email, password))
        connection.commit()

        return jsonify({'success': True, 'message': 'User signed up successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(port=5000)
