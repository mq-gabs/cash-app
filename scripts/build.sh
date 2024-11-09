#/bin/bash

# create build folder if doesn't exists
if ! [ -d build ]; then
  mkdir build
fi

# build front and move to root
rm -r build/*;
mkdir build/static;
cp -r static/* build/static;
go build -o build;
