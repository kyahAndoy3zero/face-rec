from dotenv import load_dotenv, find_dotenv
from pymongo import MongoClient
import os
import array
from bson.json_util import dumps

load_dotenv(find_dotenv())
password = os.environ.get("MONGODB_PW")
client = MongoClient('mongodb://localhost:27017/')
monitoringDB = client["monitoring-app"]
collection = monitoringDB.people


def findNameAndUpdateVisibilityAndTime(idNumber, timestr):
    print(timestr)
    all_update = {
        "$set": {"show": True, "time_in": timestr},
    }
    collection.find_one_and_update({"id_number": idNumber}, all_update)


def insertFaceData(idNumber, encodedData):

    faceData = dumps(encodedData, ensure_ascii=False)
    query = {'id_number': idNumber}
    update = {'$set': {'face_data': faceData}}
    collection.update_one(query, update)


def pullOutFaceData():
    myarr = []
    opening = '[arr('
    closing = ') '
    results = collection.find({}, {"face_data": 1})
    for result in results:
        myarr.append(result["face_data"])

    return myarr
