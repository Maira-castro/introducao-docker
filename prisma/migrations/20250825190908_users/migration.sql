-- CreateEnum
CREATE TYPE "public"."User" AS ENUM ('ADMINISTRADOR', 'CLIENTE');

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT,
    "typeUser" "public"."User" NOT NULL DEFAULT 'CLIENTE',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
