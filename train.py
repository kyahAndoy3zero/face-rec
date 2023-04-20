from dataclasses import replace
import cv2
import numpy as np
import face_recognition as face_rec
import os
import pickle
from collections import Counter
from datetime import datetime
from startdb import insertFaceData, pullOutFaceData


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


def findEncoding(images):

    try:
        with open('package/dataset_face.dat', 'rb') as f:
            existing_encodings = pickle.load(f)
    except FileNotFoundError:
        os.makedirs("package", exist_ok=True)
        open("package/dataset_face.dat", 'a').close()
        existing_encodings = []

    imgEncodings = []
    imgCount = 0
    for img in images:

        img = resize(img, 0.50)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encodeimg = face_rec.face_encodings(img)[0]
        imgEncodings.append(encodeimg)
        imgCount = len(imgEncodings) - 1
        insertFaceData(id_numbers[imgCount], imgEncodings)

    with open('package/dataset_face.dat', 'wb') as f:
        pickle.dump(imgEncodings, f)


findEncoding(studentImg)
print('Training Done')
