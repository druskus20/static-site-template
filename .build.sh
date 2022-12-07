#!/bin/bash

## Commands
## - parcel build
## - parcel serve
## - eleventy build
## - eleventy serve
## - clean
## - fmt

function parcel_build() {
    if [ -z "$PUBLIC_URL" ]; then
        echo "Error: PUBLIC_URL is not set"
        exit 1
    else 
        echo "PUBLIC_URL is set to '$PUBLIC_URL'"
    fi
    cp .parcelrc _site_eleventy 
    touch _site_eleventy/.hg 
    npx parcel build _site_eleventy/index.html --dist-dir "./_site_parcel" --no-cache --public-url "$PUBLIC_URL"
}

function parcel_serve() {
    cp .parcelrc _site_eleventy 
    touch _site_eleventy/.hg 
    npx parcel serve _site_eleventy/index.html --dist-dir _site_parcel --no-cache
}

function eleventy_build() {
    npx eleventy 
    fmt_files=$(find _site_eleventy -type f -regex ".*\.\(js\|html\|css\)")
    npx prettier --write $fmt_files
}

function eleventy_serve() {
    npx eleventy --serve
}


echo Running $1 $2

case $1 in
    "build" | "serve")  
        case $2 in
            "parcel" | "eleventy")
                BUILD_COMMAND=$1
                BUILD_TOOL=$2
                ${BUILD_TOOL}_${BUILD_COMMAND}
                ;;
            *)
                echo "Invalid argument"
                ;;
        esac
        ;;
    "clean")
        rm -rf _site .tmp_eleventy .parcel-cache dist _parcel _site_eleventy _site_parcel
        ;;
    "fmt")
        # format files in _src, _assets, static, _includes, _data, _11ty
        fmt_files=$(find src static _includes _data _11ty -type f -regex ".*\.\(js\|html\|css\|ts\|scss\)")
        npx prettier --write $fmt_files
        ;;
    *)
        echo "Invalid argument"
        ;;
esac
