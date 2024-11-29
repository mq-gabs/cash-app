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
cp static/index.html static/login;
cp static/index.html static/registrar;
cp static/index.html static/dashboard;
cp static/index.html static/servicos;
cp static/index.html static/servico;
cp static/index.html static/atendimentos;
cp static/index.html static/atendimento;
cp static/index.html static/funcionarios;
cp static/index.html static/funcionario;
cp static/index.html static/pagamentos;
cp static/index.html static/pagamento;
cp static/index.html static/usuarios;
cp static/index.html static/usuario;
cp static/index.html static/outros;
cp static/index.html static/outro;
cp static/index.html static/perfil;
cp static/index.html static/clientes;
cp static/index.html static/cliente;