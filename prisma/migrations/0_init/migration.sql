-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "firebaseId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemventa" (
    "id" SERIAL NOT NULL,
    "idVenta" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "precioCompra" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "itemventa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "priceBuy" DOUBLE PRECISION NOT NULL,
    "priceSale" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMPTZ(6) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "totalGastado" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "itemventa" ADD CONSTRAINT "itemventa_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemventa" ADD CONSTRAINT "itemventa_idVenta_fkey" FOREIGN KEY ("idVenta") REFERENCES "ventas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

