#/bin/bash

if ! [ -d static ]; then
  mkdir static
fi

# build front and move to root
cd frontend;
npm run build;
cd ..;
rm -r static/*;
cp -r frontend/dist/* static;

# force routes (change later)
cp static/index.html static/pagamentos;
cp static/index.html static/pagamento;
cp static/index.html static/users;
cp static/index.html static/login;
cp static/index.html static/register;
cp static/index.html static/services;