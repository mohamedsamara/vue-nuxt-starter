import express from 'express';

const app = express();
app.use(express.json());

app.get('/test', (_, res) => {
  res.json({
    name: 'test'
  });
});

export default {
  path: '/api',
  handler: app
};
