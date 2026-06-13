// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');


// const loginRoute = require('./routes/loginRoute');
// const homeRoute = require('./routes/homeRoute');
// const masterRoute = require('./routes/master');
// const testRoute = require('./routes/testRoute');
// const caseRoute = require('./routes/caseRoute')
// const dashboardRoute = require('./routes/dashboardRoute');

// const { swaggerSpec, swaggerUi } = require('./swagger');

// const app = express();
// const db = require('./db');

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }))


// app.use('/login', loginRoute);
// app.use('/home', homeRoute);
// app.use('/master', masterRoute);
// app.use('/test', testRoute);
// app.use('/case', caseRoute);
// app.use('/documents', express.static('uploads/documents'));
// app.use('/dashboard', dashboardRoute)

// const documentRoute = require('./routes/documentRoute');
// app.use('/document', documentRoute);  // POST /document/upload
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// BigInt.prototype.toJSON = function () {
//   return this.toString();
// };

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const loginRoute = require('./routes/loginRoute');
const homeRoute = require('./routes/homeRoute');
const masterRoute = require('./routes/master');
const testRoute = require('./routes/testRoute');
const caseRoute = require('./routes/caseRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const documentRoute = require('./routes/documentRoute');

const { swaggerSpec, swaggerUi } = require('./swagger');
const redisClient = require('./redis'); 

const app = express();
const db = require('./db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/login', loginRoute);
app.use('/home', homeRoute);
app.use('/master', masterRoute);
app.use('/test', testRoute);
app.use('/case', caseRoute);
app.use('/documents', express.static('uploads/documents'));
app.use('/dashboard', dashboardRoute);
app.use('/document', documentRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

BigInt.prototype.toJSON = function () {
  return this.toString();
};
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await redisClient.connect();


    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1); // stop server if Redis fails
  }
}
startServer();
