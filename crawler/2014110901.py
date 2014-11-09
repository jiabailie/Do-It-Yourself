# -*- coding: gbk -*-
# python 3.3
import urllib.request
import io
import codecs

url = "http://www.iciba.com/"
code = 'utf-8'
response = urllib.request.urlopen(url)
with codecs.open('example.html', 'w', code) as file:
    for line in response.readlines():
        line = line.decode(code)
        line += '\n'
        file.write(line)
