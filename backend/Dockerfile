# Dockerfile backend
FROM node:16.14

# WORKDIR /usr/src/app
WORKDIR /usr

ARG PORT=${PORT}
ENV PORT=${PORT}
ARG FRONTEND_URL=${FRONTEND_URL}
ENV FRONTEND_URL=${FRONTEND_URL}
ARG BACKEND_URL=${BACKEND_URL}
ENV BACKEND_URL=${BACKEND_URL}
ARG DB_HOST=${DB_HOST}
ENV DB_HOST=${DB_HOST}
ARG DB_PORT=${DB_PORT}
ENV DB_PORT=${DB_PORT}
ARG DB_USER=${DB_USER}
ENV DB_USER=${DB_USER}
ARG DB_PASSWORD=${DB_PASSWORD}
ENV DB_PASSWORD=${DB_PASSWORD}
ARG DB_NAME=${DB_NAME}
ENV DB_NAME=${DB_NAME}
ARG JWT_SECRET=${JWT_SECRET}
ENV JWT_SECRET=${JWT_SECRET}

COPY . .

RUN npm install

CMD [ "npm", "start" ]
