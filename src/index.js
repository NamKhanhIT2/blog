const path=require('path')
const express=require('express')
const morgan = require('morgan');
const {engine}=require('express-handlebars')
const methodOverride=require('method-override');
const route=require('./routers')
const db=require('./config/db');
db.connect();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
const port = 3000;
 
 
 
app.use(express.static(path.join(__dirname,'public')))
app.use(morgan('combined'))
app.engine('.hbs',engine({extname:'.hbs',
    helpers:{
        sum:(a,b)=>a+b,
    }
}))
app.set('view engine','.hbs')
app.set('views',path.join(__dirname,'resources','views'))
 
route(app);
 
 
 
 app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
 