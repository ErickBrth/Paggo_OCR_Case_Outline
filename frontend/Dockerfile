# frontend/Dockerfile
FROM node:23

RUN apt-get update && apt-get install -y build-essential python3

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install lightningcss


COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
