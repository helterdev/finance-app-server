import { connectDB } from './db/db';
import app from './app';

const port = process.env.PORT!;

connectDB();

app.listen(port, () => {
  console.log(`Server runing in the port: http://localhost:${port}`);
});
