const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./utils/errorHandler");
var cors = require("cors");
const path = require('path');
const passport = require('passport');

dotenv.config({ path: "./config/config.env" });
require("colors");

const app = express();

// Mount middlewares
app.use(express.json());
app.use(cors());

// use morgan for logging if in dev mode
if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

// Create link to Angular build directory
var distDir = __dirname + "/dist/edensis";
app.use(express.static(distDir));


// Mongodb connection via mongoose
connectDB();
require('./config/passport');
app.use(passport.initialize());



// Mount routers
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/students', require('./routes/students'));
app.use('/api/v1/candidates', require('./routes/candidates'));
app.use('/api/v1/positions', require('./routes/positions'));
app.use('/api/v1/elections', require('./routes/elections'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/edensis/index.html'));
})


app.use(errorHandler);

const server = app.listen(process.env.PORT, () =>
  console.log(
    `\n\n\**Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}**`
      .yellow.underline
  )
);

process.on("unhandledRejection", err => {
  console.log(err.message.red.bold);
  server.close(() => process.exit(1));
});
