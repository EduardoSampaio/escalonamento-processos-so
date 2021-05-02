const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/escalonamento-processos'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/escalonamento-processos/index.html');
})

app.listen(PORT, () => {
  console.log('Server Start ' + PORT)
});
