from PIL import Image, ImageFilter  
import os

folder = 'blurry'
output = 'output'

file_list = os.listdir(folder)

for index, file in enumerate(file_list):
  radius = (index % 5) + 3
  if '.jpg' in file:
    raw = Image.open(os.path.join(folder, file))
    out = raw.filter(ImageFilter.GaussianBlur(radius = index))
    out.save(os.path.join(output, file))