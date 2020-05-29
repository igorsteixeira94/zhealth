import app from './app';

app.listen(process.env.PORT || 3000,process.env.HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Running in http://${process.env.HOST}:${process.env.PORT}`);
});
