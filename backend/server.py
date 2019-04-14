from pathlib import Path

import sqlalchemy
from sqlalchemy.sql.functions import coalesce
from flask import request, send_from_directory

from backend import app
from backend.database import db, User

STATIC = Path(app.static_folder)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def root(path):
    if path and (STATIC / path).exists():
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/users/add', methods=['POST'])
def add_user():
    get = request.form.get
    try:
        db.session.add(User(
          name=get('name'),
          bitmoji_url=get('bitmoji_url'),
          username=get('username')
        ))
    except sqlalchemy.exc.IntegrityError as e:
        db.session.rollback()
        return str(e), 400  # XXX: 409?
    db.session.commit()
    return '', 200


def _coalesce_all_columns(get, model):
    return {
      colname: coalesce(get(colname), getattr(model, colname))
      for colname in model.__table__.columns._data
    }


@app.route('/users/update', methods=['POST'])
def edit_user():
    get = request.form.get
    try:
        User.query(
          username=get('username')
        ).update(**_coalesce_all_columns(get, User))
    except sqlalchemy.exc.IntegrityError as e:
        db.session.rollback()
        return str(e), 400
    db.session.commit()
    return '', 200
