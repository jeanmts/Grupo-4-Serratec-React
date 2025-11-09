# Usa uma imagem base Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos do projeto para dentro do container
COPY package*.json ./
RUN npm install

COPY . .

# Expõe a porta (usa a mesma que está no .env)
EXPOSE ${PORT}

# Comando para rodar o servidor
CMD ["npm", "start"]
