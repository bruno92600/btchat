import express from 'express';
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';

import dotenv from "dotenv"
import { app, server } from './socket/socket.js';
dotenv.config()

const PORT = process.env.PORT || 3001

app.use(cookieParser()) // for parsing cookies

app.use(express.json()) // for parsing application/json

app.use("/api/auth", authRoutes)
app.use("/api/messages", messagesRoutes)

server.listen(PORT, () => {
  console.log('Le serveur tourne sur ' + PORT);
});

// ajouter socket io pour le serveur
// configurer ce serveur pour le déploiement