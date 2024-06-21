import mongoose from 'mongoose';
import express from 'express';

const app = express()

const connectionString = process.env.DATABASE_PASSWORD && process.env.CONNECTION_STRING_DATABASE?.replace(
    "<PASSWORD>", process.env.DATABASE_PASSWORD)

if (connectionString) {
    await mongoose.connect(connectionString)
    console.log('Base de datos conectada')
} else
    throw new Error('La connection string es undefined, no se pudo obtener las variables de entorno')

export default app