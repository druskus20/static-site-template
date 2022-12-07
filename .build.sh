#!/bin/bash

## Commands
## - parcel build
## - parcel serve
## - eleventy build
## - eleventy serve
## - clean
## - fmt

function parcel_build() {
    cp .parcelrc _site_eleventy 
    touch _site_eleventy/.hg 
    npx parcel build _site_eleventy/index.html --dist-dir _site_parcel --no-cache --public-url "$PUBLIC_URL"
}

function parcel_serve() {
    cp .parcelrc _site_eleventy 
    touch _site_eleventy/.hg 
    npx parcel serve _site_eleventy/index.html --dist-dir _site_parcel --no-cache
}

function eleventy_build() {
    npx eleventy 
}

function eleventy_serve() {
    npx eleventy --serve
}

echo $1 $2

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
        prettier --write '{./,./{src,_assets,static,_includes,_data}/**/}*.{json,md,js,css,scss}'
        ;;
    *)
        echo "Invalid argument"
        ;;
esac
