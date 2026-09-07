FROM node:24-alpine3.23 AS build
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup
USER appuser
WORKDIR /frontend/
COPY --chown=appuser:appgroup package*.json ./
RUN npm ci
COPY --chown=appuser:appgroup . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --chown=nginx:nginx --from=build /frontend/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
