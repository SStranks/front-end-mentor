# Primary Stage: Build NodeJS Express Image
FROM node:18-alpine3.17 as primary

WORKDIR /server
COPY package*.json /server/
RUN npm install && npm cache clean --force

COPY . /server/
RUN npm run compile


# Secondary Stage: Build NodeJS Express Image
FROM node:18-alpine3.17

WORKDIR /server
ENV NODE_ENV=production

LABEL version="1.0"
LABEL description="Image: FEM#34: Backend: NodeJS Express"

COPY --from=primary /server/package*.json /server/
RUN npm install --omit=dev && npm cache clean --force

COPY --from=primary /server/dist/ /server/dist/

EXPOSE 4000
CMD ["npm", "run", "prod"]
