import express from "express";
import cors from 'cors';
import airbnb from './api/airbnb.route.js';

const app = express()

app.use(cors())
app.use(express.json())

app.use("/airbnb", airbnb)
app.use("*", (req, res) => res.status(404).json({ error: "not valid page"}))

export default app;