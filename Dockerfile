# syntax=docker/dockerfile:1
FROM node:16-alpine

# ----------------------------
LABEL name="Niklas Trenz"
LABEL email="niklas.trenz@sap.com"
LABEL date="18.10.2022"
# ----------------------------

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /var/www/app
COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE ${PORT}

ENTRYPOINT ["npm", "start"]