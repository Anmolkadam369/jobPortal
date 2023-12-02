const express = require('express');
const { sequelize } = require('./dbconnection');
const app = express();
const route = require('./route/route')
const port = 3000;
app.use(express.json());
app.use('/',route);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`Server is running at http://localhost:${port}`);
});
