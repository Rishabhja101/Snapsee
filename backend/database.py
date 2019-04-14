from flask_sqlalchemy import SQLAlchemy

from backend import app

app.config['SQLALCHEMY_DATABASE_URI'] = (
  'postgres+psycopg2://'
  'kylemumma:password123'
  '@hackathon-starter-db.c9rs154pvph6.us-west-2.rds.amazonaws.com'
  ':5432'
  '/hackathondb'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # suppress deprecation warning
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'
    uid = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.Text)
    bitmoji_url = db.Column(db.Text, unique=True)
    username = db.Column(db.Text, unique=True)
    image = db.Column(db.LargeBinary)

    def to_dict(self):
        return {colname: getattr(self, colname) for colname in self.__table__.columns._data}
