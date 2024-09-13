import app from "./app"
import router from "./routes";
import {client, connectToDatabase} from "./database";

app.listen(3000);

connectToDatabase().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', router);

console.log('Server listening on port 3000');