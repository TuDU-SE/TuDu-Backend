FROM node:10-alpine

# ----------------------------
LABEL maintainer ="Niklas Trenz <niklas.trenz@sap.com>"
LABEL date="18.10.2022"
# ----------------------------

# wollen wir das prod lassen?
ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /var/www/app
COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE ${PORT}

ENTRYPOINT ["npm", "start"]

