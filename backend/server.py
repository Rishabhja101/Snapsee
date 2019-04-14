from pathlib import Path

import sqlalchemy
from sqlalchemy.sql.functions import coalesce
from flask import request, send_from_directory
from flask.json import jsonify

from backend import app, faces
from backend.database import db, User

STATIC = Path(app.static_folder)


def _coalesce_all_columns(model):
    return {
      colname: coalesce(get(colname), getattr(model, colname))
      for colname in model.__table__.columns._data
    }


def _get_all(model, *, filter_none=False):
    if filter_none:
        return {colname: get(colname) for colname in model.__table__.columns._data if get(colname) is not None}
    return {colname: get(colname) for colname in model.__table__.columns._data}


def get(key):
    if key in request.form.files:
        return request.form.files.get(key).read()
    return request.values.get(key)



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def root(path):
    if path and (STATIC / path).exists():
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/user/add', methods=['POST'])
def add_user():
    if not get('username'):
        return 'Must provide username', 400
    try:
        db.session.add(**_get_all(User))
    except sqlalchemy.exc.IntegrityError as e:
        db.session.rollback()
        return str(e), 400  # XXX: 409?
    db.session.commit()
    return '', 204


@app.route('/user/update', methods=['POST'])
def edit_user():
    if not get('username'):
        return 'Must provide username', 400
    try:
        User.query.filter_by(
          username=get('username')
        ).update(**_coalesce_all_columns(User))
    except sqlalchemy.exc.IntegrityError as e:
        db.session.rollback()
        return str(e), 400
    db.session.commit()
    return '', 204


@app.route('/user/get/', methods=['GET'])
def user_get():
    try:
        results = User.query.filter_by(
          **_get_all(User, filter_none=True)
        ).all()
    except Exception as e:
        return str(e), 400
    return jsonify([i.to_dict() for i in results]), 200


@app.route('/user/get/<colname>', methods=['GET'])
def user_get_column(colname):
    try:
        results = [{colname: getattr(i, colname)} for i in User.query.filter_by(**_get_all(User, filter_none=True)).all()]
    except Exception as e:
        return str(e), 400
    return jsonify(results), 200


@app.route('/image/match', methods=['POST'])
def match_image():
    match_found = faces.match(get('image'))
