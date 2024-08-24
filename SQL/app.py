from flask import Flask, jsonify
import psycopg2
import configparser
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
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
        "/platforms_data<br/>"
        "/artists_data<br/>"
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

@app.route('/platforms_data', methods=['GET'])
def get_platform():
    
    platforms_data = ['SpotifyStreams',
        'YouTubeViews',
        'TikTokViews',
        'PandoraStreams']
    
    return jsonify(platforms_data)

@app.route('/artists_data', methods=['GET'])
def get_artists():
    df = pd.read_csv('../Cleaned_Datasets/cleaned_data_visual_two.csv')
    df = df.where(pd.notnull(df), None)
    top_ten_artists = df['Artist'].value_counts().head(10).index.tolist()
    return jsonify(top_ten_artists)

if __name__ == '__main__':
    app.run(debug=True)
