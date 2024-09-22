//Imports
const app = require('../index')
const routes = require('./router')
const { sequelize }  = require('./model/schemas')

//Database
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

//Sync Tables
(async () => {
    await sequelize.sync({ alter: true }); 
    console.log('Tables synchronized/updated successfully!');
  })();

  app.use(routes); //Configuração da utilização dos endpoints

//Server
const port = process.env.PORT;

app.listen(port, () => { console.log(`Server running on port ${port}`)});