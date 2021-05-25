import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello world' });
});

app.listen(3333, () => console.log('server is running on port 3333'));