# Definição

Api para cadastro de prescrições médicas ! Possui rodas para o CRUD de médicos, pacientes e prescrições médicas.



## 🚀️ Tecnologias 

- Nodejs;
- Express;
- Bcrypt;
- DotEnv;
- JWT;
- Mongoose;
- Yup;
- Nodemon e Sucrase;
- Mocha, chai e chai-http;
- Banco de dados: MongoDB.



## 👨‍💻️ Como Usar

- [x] Para usar o código deste repositório, basta seguir os seguintes passos:

```shell
git clone git@github.com:igorsteixeira94/zhealth.git
cd zhealth
yarn install
```

- [x] Preencher o arquivo dotenv, com suas configurações. E instalar o banco de dados.

- [x] Para instalar o MongoDB:

```
docker run --name mongo-container -p 27017:27017 -d mongo
```

Por fim, para rodar a aplicação basta executar:

```
yarn dev:server
```



## 📊️ Teste

Principais features do desafio: 

- [x] Cadastrar de médico; (POST /doctors)
- [x] Autenticação do médico; (POST /sessions)
- [x] Cadastro de prescição médica; (POST /prescriptions)
- [x] Listagem de prescrições médicas emitidas por um médico. *um prescrição não pode ser vista por um médico que não a cadastrou* (GET /prescriptions)

