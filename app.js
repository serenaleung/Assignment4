// Require Dependencies
const Express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const path         = require('path');
var ejsLint=require('/Users/serena/Documents/Codecore/Bootcamp/Day19/Assignment/TeamRandomizer/app.js');
const teams = require('./routes/teams');

const app = Express();

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(Express.static(path.join(__dirname, 'public')));

app.use('/', teams);

app.listen(PORT, function() {
  console.log(`Server listening on http://localhost:${PORT}`)
});
