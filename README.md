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
### 🐋️ Usando Docker-Compose:

Basta executar o comando:
```
docker-compose up
```



## 📊️ Teste

Principais features do desafio:

- [x] Cadastrar médico; (POST /doctors)
- [x] Autenticação do médico; (POST /sessions)
- [x] Cadastro de prescição médica; (POST /prescriptions)
- [x] Listagem de prescrições médicas emitidas por um médico. *um prescrição não pode ser vista por um médico que não a cadastrou* (GET /prescriptions)

<img src="https://user-images.githubusercontent.com/47749249/83084570-b8bdb880-a05f-11ea-9f9d-9fc7713bf99a.png" height="400" width="400"/>   <img src="https://user-images.githubusercontent.com/47749249/83084948-da6b6f80-a060-11ea-89e6-345dfa7197d1.png" height="400" width="400"/>

*Para rodar os testes, execute:*
```
yarn coverage
```
