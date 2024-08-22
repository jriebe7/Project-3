from flask import Flask, jsonify
import psycopg2
import configparser

app = Flask(__name__)

# Read the database connection information from the config.ini file
config = configparser.ConfigParser()
config.read('config.ini')

database = config['postgresql']['database']
user = config['postgresql']['user']
password = config['postgresql']['password']
host = config['postgresql']['host']

@app.route('/data', methods=['GET'])
def get_data():
    conn = psycopg2.connect(
    database=database,
    user=user,
    password=password,
    host=host
)
    cur = conn.cursor()
    cur.execute("SELECT * FROM spoitfy_data")
    data = [dict(row) for row in cur.fetchall()]
    conn.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
