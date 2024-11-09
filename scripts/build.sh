#/bin/bash

# build front and move to root
cd frontend;
npm run build;
cd ..;
rm -r build/*;
mkdir build/static;
cp -r static/* build/static;
go build -o build;
