### Instructions: Installation
npm install prisma @prisma/client
npx prisma init

### Instructions: For Development
npx prisma migrate dev --name init

### Instructions: For Production
npx prisma migrate deploy

### Instructions: Add in file where to use
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

### Instructions: file (schema.prisma)
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model ExampleModelName {
  id       String  @id @default(uuid())
  email    String  @unique
  createdAt DateTime @default(now())
  tasks    Task[]
}

Enternal Database URL (render) to DATABASE_URL
?sslmode=require
npx prisma generate
npx prisma db push
npx prisma studio

If needed to reset: npx prisma migrate reset