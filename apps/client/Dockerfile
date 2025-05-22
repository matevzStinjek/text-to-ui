FROM oven/bun:1 AS build

WORKDIR /app

COPY .. .

# necessary due to eden's server type inferrence
WORKDIR /app/schema-service
RUN bun install --frozen-lockfile

WORKDIR /app/client
RUN bun install --frozen-lockfile

RUN bun run build

FROM nginx:alpine AS final
COPY --from=build /app/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
