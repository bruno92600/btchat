import express from 'express';
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';

import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(cookieParser()) // for parsing cookies

app.use(express.json()) // for parsing application/json

app.use("/api/auth", authRoutes)
app.use("/api/messages", messagesRoutes)

app.listen(3000, () => {
  console.log('Le serveur tourne sur 3000');
});

// ajouter socket io pour le serveur
// configurer ce serveur pour le déploiement