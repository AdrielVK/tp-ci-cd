# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — base
# Imagen mínima compartida por dev y prod
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS base

# Instala pnpm globalmente via corepack (viene incluido en Node 22)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiamos solo los archivos de dependencias primero para aprovechar
# el cache de Docker: si no cambian, no se reinstalan
COPY package.json pnpm-lock.yaml ./


# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — development
# Levanta el dev server de Vite con HMR
# ─────────────────────────────────────────────────────────────────────────────
FROM base AS development

# Instala TODAS las dependencias (incluyendo devDependencies)
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173

# Vite necesita --host para ser accesible desde fuera del contenedor
CMD ["pnpm", "dev", "--host", "0.0.0.0"]


# ─────────────────────────────────────────────────────────────────────────────
# Stage 3 — builder
# Compila el proyecto para producción
# ─────────────────────────────────────────────────────────────────────────────
FROM base AS builder

# Solo dependencias de producción + devDeps necesarias para el build
RUN pnpm install --frozen-lockfile

COPY . .

# Ejecuta lint y type-check antes del build (falla el build si hay errores)
RUN pnpm lint
RUN pnpm tsc --noEmit
RUN pnpm build


# ─────────────────────────────────────────────────────────────────────────────
# Stage 4 — production
# Imagen final mínima con Nginx sirviendo el build estático
# ─────────────────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS production

# Elimina la config por defecto de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copia nuestra config personalizada
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copia el build de Vite desde el stage anterior
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Nginx corre en foreground para que Docker lo gestione
CMD ["nginx", "-g", "daemon off;"]