from models.student import Student
import flask

api = flask.Flask(__name__)
database = {"students": {}}


@api.route("/")
def default():
    return {"cheese": "tasty"}


@api.route("/get-student-by-name/<string:name>")
def get_student_by_name(name: str):
    if name not in database["students"]:
        return {"message": "error, student doesnt exist"}

    return vars(database["students"][name])


@api.route("/add-student")
def add_student():
    name = flask.request.args.get("name", type=str)
    grade = flask.request.args.get("grade", type=int)
    major = flask.request.args.get("major", type=str)

    s = Student(name, grade, major)
    print(major)
    database["students"][name] = s

    return {"message": "success"}


@api.route("/remove-student-by-name/<string:name>")
def remove_student(name: str):
    if name not in database["students"]:
        return {"message": "error, student doesnt exist"}

    del database["students"][name]

    return {"message": "success"}


api.run()
