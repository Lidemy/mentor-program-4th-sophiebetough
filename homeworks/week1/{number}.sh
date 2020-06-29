#!/bin/bash

for ((i=1; i<=$1; i++))
do
    touch "$i.js"
done

echo "建立檔案完成"
