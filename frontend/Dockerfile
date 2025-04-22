FROM node:23-slim

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install postcss postcss-loader tailwindcss autoprefixer
RUN npm install lightningcss

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
