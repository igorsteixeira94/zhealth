import app from './app';

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log('Servidor iniciado na porta 3000');
});
