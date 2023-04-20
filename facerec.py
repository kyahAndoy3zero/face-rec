from dataclasses import replace
import cv2
import numpy as np
import face_recognition as face_rec
import os
import pickle
from collections import Counter
from datetime import datetime
from startdb import findNameAndUpdateVisibilityAndTime, insertFaceData


date_now = datetime.today()
path = 'student_images'
studentImg = []
id_numbers = []
finalNames = []
myList = os.listdir(path)


def resize(img, size):
    width = int(img.shape[1]*size)
    height = int(img.shape[0] * size)
    dimension = (width, height)
    return cv2.resize(img, dimension, interpolation=cv2.INTER_AREA)


for cl in myList:
    numbered_list = []
    curimg = cv2.imread(f'{path}/{cl}')
    studentImg.append(curimg)
    numbered_list.append(os.path.splitext(cl)[0])
    for items in numbered_list:
        studentName = []
        studentName.append(items.rstrip(items[-1]))
        for items in studentName:
            id_numbers.append(items.split(' ')[-1])
            finalNames.append(items.rsplit(' ', 1)[0])


def MarkAttendence(idNumber):
    timestr = date_now.now().strftime('%H:%M:%S')
    findNameAndUpdateVisibilityAndTime(idNumber, timestr)


all_face_encodings = []
try:
    with open('package/dataset_face.dat', 'rb') as f:
        all_face_encodings = pickle.load(f)
except FileNotFoundError:
    all_face_encodings = []
    print("No data found.")


vid = cv2.VideoCapture(0)

while True:

    success, frame = vid.read()
    Smaller_frames = cv2.resize(frame, (0, 0), None, 0.25, 0.25)
    facesInFrame = face_rec.face_locations(Smaller_frames)
    encodeFacesInFrame = face_rec.face_encodings(Smaller_frames, facesInFrame)

    for encodeFace, faceloc in zip(encodeFacesInFrame, facesInFrame):
        matches = face_rec.compare_faces(all_face_encodings, encodeFace)
        facedis = face_rec.face_distance(all_face_encodings, encodeFace)
        matchIndex = np.argmin(facedis)

        if matches[matchIndex]:
            name = finalNames[matchIndex]
            idNumber = id_numbers[matchIndex]
            y1, x2, y2, x1 = faceloc
            y1, x2, y2, x1 = y1*4, x2*4, y2*4, x1*4
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 3)
            cv2.rectangle(frame, (x1, y2-25), (x2, y2),
                          (0, 255, 0), cv2.FILLED)
            cv2.putText(frame, name, (x1+2, y2-2),
                        cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1)
            MarkAttendence(idNumber)

    cv2.imshow('video', frame)
    if (cv2.waitKey(1) == ord('q')):
        break

vid.release()
cv2.destroyAllWindows()
