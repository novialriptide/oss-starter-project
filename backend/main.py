import flask

api = flask.Flask(__name__)

@api.route("/getStudentByName/<str:name>")
def my_profile():
    return "lol"
