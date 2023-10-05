const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use('/images_cities', express.static(__dirname + '/images_cities'));

const cities = require('./cities.json');

app.get('/cities', (req, res) => {
  res.json(cities);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
