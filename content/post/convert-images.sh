#!/bin/bash -e

for i in ./**/*.png; do
    o=${i%.*}.webp
    if [ ! -f "$o" ] && [ -f "$i" ]; then
        echo "Converting $i to $o"
        ffmpeg -n -i "$i" -vf scale=1600:-1 -c:v libwebp "$o"
    fi
    if [ -f "$i" ]; then
        rm -Rf "$i"
    fi
done

for i in ./**/*.jpeg; do
    o=${i%.*}.webp
    if [ ! -f "$o" ] && [ -f "$i" ]; then
        echo "Converting $i to $o"
        ffmpeg -n -i "$i" -vf scale=1600:-1 -c:v libwebp "$o"
    fi
    if [ -f "$i" ]; then
        rm -Rf "$i"
    fi
done

for i in ./**/*.jpg; do
    o=${i%.*}.webp
    if [ ! -f "$o" ] && [ -f "$i" ]; then
        echo "Converting $i to $o"
        ffmpeg -n -i "$i" -vf scale=1600:-1 -c:v libwebp "$o"
    fi
    if [ -f "$i" ]; then
        rm -Rf "$i"
    fi
done

exit 0
