import { Router } from "express";
import express from "express";


const app = express();

app.use(express.json());

app.use(Router);

export default app;