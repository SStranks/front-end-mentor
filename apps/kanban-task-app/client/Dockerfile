# Primary Stage: Build React Image
FROM node:18-alpine3.17 as primary

LABEL version="1.0"
LABEL description="Image: #35 Kanban: Frontend: React"

WORKDIR /client
COPY package*.json /client/
RUN npm install && npm cache clean --force

COPY . /client

RUN npm run build && npm prune --production



# Secondary Stage: Build Nginx Image
FROM nginx:1.24-alpine

LABEL version="1.0"
LABEL description="Image: #35 Kanban: Frontend: Nginx-React"

# // NOTE:  Still need to ascertain best practices
# RUN groupadd -r appUser && useradd -r -g appUser appUser

COPY --from=primary /client/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

USER nginx
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
