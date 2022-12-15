import express from 'express';
import 'dotenv/config'

import cors from 'cors';
import connectMongoDB from './config/connectDB.js';

//Importing routes
import veterinario from './routes/veterinario.js';
import paciente from './routes/paciente.js';

const app = express();

connectMongoDB();

console.log(process.env.FRONTEND_URL);

app.use(cors({
    origin: [process.env.FRONTEND_URL]
}));

app.use(express.json());

//routes
app.use('/api/veterinario', veterinario);
app.use('/api/pacientes', paciente);

//middleware


app.use((req, res, next) => {
    res.status(404).send('not found 404');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server is running on port 4000');
});