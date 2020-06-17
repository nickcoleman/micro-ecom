FROM node:13

WORKDIR /app
COPY packag.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev'"]