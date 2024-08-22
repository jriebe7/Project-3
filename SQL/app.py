from flask import Flask, jsonify
import psycopg2
import configparser

app = Flask(__name__)

# Read the database connection information from the config.ini file
config = configparser.ConfigParser()
config.read('config.ini')

user = config['postgresql']['user']
password = config['postgresql']['password']
host = config['postgresql']['host']
port = config['postgresql']['port']
database = config['postgresql']['database']

@app.route("/")
def homepage():
    """List all available API routes."""
    return (
        "Available Routes:<br/>"
        "/spotify_data<br/>"
    )

@app.route('/spotify_data', methods=['GET'])
def get_spotify_data():
    conn = psycopg2.connect(
    user=user,
    password=password,
    host=host,
    port=port,
    database=database
)
    cur = conn.cursor()
    cur.execute("SELECT * FROM spotify_data")
    columns = [col[0] for col in cur.description]
    data = [dict(zip(columns, row)) for row in cur.fetchall()]
    conn.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
