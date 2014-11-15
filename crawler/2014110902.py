# -*- coding: utf-8 -*-
# python 3.3
import urllib
import urllib.request
import io
import codecs

code = 'utf-8'

data = {}
data['word'] = 'binary search tree'

url_values = urllib.parse.urlencode(data)
url = "http://www.baidu.com/s?"
full_url = url + url_values

response = urllib.request.urlopen(full_url)
with codecs.open('readdetail.html', 'w', code) as file:
    for line in response.readlines():
        line = line.decode(code)
        line += '\n'
        file.write(line)

keys = ['binary search tree', 'depth first search', 'breadth first search']
for key in keys:
    full_url = url + 'word=' + key
    response = urllib.request.urlopen(full_url)
    with codecs.open(key + '.html', 'w', code) as file:
        for line in response.readlines():
            line = line.decode(code)
            line += '\n'
            file.write(line)

def writeFile(url, path):
    
