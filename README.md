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

- [x] Para usar o código (sem docker) deste repositório, basta seguir os seguintes passos:

```shell
git clone git@github.com:igorsteixeira94/zhealth.git
cd zhealth
yarn install
```

- [x] Preencher o arquivo dotenv, com suas configurações. E instalar o banco de dados.

- [x]Dica: Para instalar o MongoDB:

```
docker run --name mongo-container -p 27017:27017 -d mongo
```

Por fim, para rodar a aplicação basta executar:

```
yarn dev:server
```
### 🐋️ Usando Docker-Compose:

Uma alternativa mais produtiva é a instalação através do orquestrador de containers do Docker ! Com um simples comando inicializamos api e banco de dados. :
```
docker-compose up
```



## 📊️ Teste

Principais features do desafio:

- [x] Cadastrar médico; (POST /doctors)
- [x] Autenticação do médico; (POST /sessions)
- [x] Cadastro de prescição médica; (POST /prescriptions)
- [x] Listagem de prescrições médicas emitidas por um médico. *um prescrição não pode ser vista por um médico que não a cadastrou* (GET /prescriptions)

<img src="https://user-images.githubusercontent.com/47749249/83317182-5b616d00-a201-11ea-8487-4de5c345cd35.png" height="500" width="500"/>

*Para rodar os testes, execute:*
```
yarn coverage
```
