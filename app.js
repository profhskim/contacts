const express = require('express');
const dbConnect = require('./config/dbConnect');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

/* const logger = (req, res, next) => {
  console.log('User Logged');
  next();
}; */

dbConnect();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/loginRouters'));
app.use('/contacts', require('./routes/contactRoutes'));

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중`);
});
