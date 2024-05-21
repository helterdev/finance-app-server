import { connectDB } from './db/db';
import app from './app';
import accessenv from './config';

const port = accessenv.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Server runing in the port: http://localhost:${port}`);
});
