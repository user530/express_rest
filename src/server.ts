import app from './app/app';
import './configs/dotenv.option.js'
import { connectDb } from './database/connection';

const PORT = isNaN(Number(process.env.PORT)) ? 3000 : process.env.PORT;
const DB_URI = process.env.MONGO_URI || '';

// Connect to the database
await connectDb(DB_URI)

app.listen(PORT, () => console.log('Server is up and running!'));