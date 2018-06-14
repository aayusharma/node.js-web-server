const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, nxt)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to append file');
    }
  });
  //fs.appendFile('server.log',log+'\n');
  nxt();
});
/*app.use((req,res,next)=>{
  res.render('maintain.hbs');
})*/
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('capsIt',(text)=>{
  return text.toUpperCase();
});


app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    para: 'Welcome to HomePage'
  })
});
app.get('/about',(req,res)=> {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});
app.get('/bad',(req,res)=> {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
  //console.log(`Server is up on port 3000`);
});
