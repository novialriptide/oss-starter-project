from models.student import Student
import json
import flask
import pymongo
import flask_cors

api = flask.Flask(__name__)
mongo_client = pymongo.MongoClient("localhost", 27017)

flask_cors.CORS(api)
students_collection = mongo_client.oss.get_collection("students")

@api.route("/")
def default():
    return {"cheese": "tasty"}


@api.route("/get-student-by-name/<string:name>")
def get_student_by_name(name: str):
    out = students_collection.find_one({"name": name})

    if out is None:
        return {"message": "doesnt exist"}
    
    del out["_id"]

    return out

@api.route("/get-students")
def get_students():
    out = {"students": []}
    for x in students_collection.find({}):
        del x["_id"]
        out["students"].append(x)

    return out

@api.route("/add-student")
def add_student():
    name = flask.request.args.get("name", type=str)
    grade = flask.request.args.get("grade", type=int)
    major = flask.request.args.get("major", type=str)

    if students_collection.find_one({"name": name}) is not None:
        return {"message": "already exists"}

    s = Student(name, grade, major)
    students_collection.insert_one(vars(s))

    return {"message": "success"}


@api.route("/remove-student-by-name/<string:name>")
def remove_student(name: str):
    if students_collection.find_one({"name": name}) is None:
        return {"message": "error, student doesnt exist"}

    students_collection.delete_one({"name": name})

    return {"message": "success"}


api.run()
