import os
from pickletools import optimize
import PIL
from PIL import Image
from tkinter.filedialog import *
import shutil

path2 = 'student_images'
myList2 = os.listdir(path2)

current = os.chdir("C:/Users/ortec/Desktop/face-recog/student_images")

for image in myList2:

    img_name = image.split('.')[0]
    img = Image.open(image)
    myHeight, myWidth = img.size
    img = img.resize((myHeight, myWidth))
    img.save(img_name + '.jpg', optimize=True, quality=30)

print('Images are compressed')
