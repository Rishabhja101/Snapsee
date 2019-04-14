from backend.server import app

app.run('localhost', 8000, True, threaded=True)