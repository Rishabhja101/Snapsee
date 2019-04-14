from flask import Flask

app = Flask(__name__, static_folder='../build')

from . import database, server, faces