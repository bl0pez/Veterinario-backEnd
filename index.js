import express from 'express';
import 'dotenv/config'

import cors from 'cors';
import connectMongoDB from './config/connectDB.js';

//Importing routes
import veterinario from './routes/veterinario.js';
import paciente from './routes/paciente.js';

const app = express();

connectMongoDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            //Origin is allowed
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));

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