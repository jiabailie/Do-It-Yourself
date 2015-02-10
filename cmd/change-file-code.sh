# !/bin/bash
# change .txt file code from gbk to utf8
for i in `find ./ -type f -name '*.txt'`;
do
	echo $i
	echo ${i}.tmp
	iconv -f gbk -t utf-8 $i>${i}.tmp
	mv ${i}.tmp $i;
done
