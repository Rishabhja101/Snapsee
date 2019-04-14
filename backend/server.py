from pathlib import Path

from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='../build')
from backend.database import db

STATIC = Path(app.static_folder)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def root(path):
    if path and (STATIC / path).exists():
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')
