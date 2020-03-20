import pandas as pd
from urllib import request

destination = 'blurry'

def download(url):
  try:
    print(url)
    request.urlretrieve(url,destination+'/'+url.split('/')[-1])
    return url
  except:
    print('error, ignored')


df = pd.read_csv('./blurry_links.csv')

for _, row in df.iterrows():
  download(row.link)