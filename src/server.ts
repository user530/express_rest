import app from './app/app';
import './configs/dotenv.option.js'

const PORT = isNaN(Number(process.env.PORT)) ? 3000 : process.env.PORT;

app.listen(PORT, () => console.log('Server is up and running!'));