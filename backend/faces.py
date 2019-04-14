from tempfile import NamedTemporaryFile

import face_recognition

from backend.database import db, User


def _nmt_from(file_object):
    return 


def _fetch_images():
    return (i.image for i in User.query.all())



def _fetch(query, attr):
    start = 0
    while True:
        results = query.slice(start, start + 5).all()
        if results is None:
            break
        for result in results:
            yield getattr(result, attr)
        start += 5


def match(data):
    # data will be a bytestring
    #
    # load your image
    with NamedTemporaryFile() as f:
        f.write(data)
        to_match = face_recognition.load_image_file(f.name)
    # encoded the loaded image into a feature vector
    to_match_encoded = face_recognition.face_encodings(to_match)

    # iterate over each image
    for image in _fetch(User.query, 'image'):
        with NamedTemporaryFile() as f:
            f.write(image)
            current = face_recognition.load_image_file(f.name)
        # encode the loaded image into a feature vector
        current_encoded = face_recognition.face_encodings(current)
        # match your image with the image and check if it matches
        result = face_recognition.compare_faces(
          current_encoded, to_match_encoded
        )
        # check if it was a match
        if any(result):
            return True
    return False
