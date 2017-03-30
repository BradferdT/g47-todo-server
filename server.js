var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
//Wat? Read /http://stackoverflow.com/questions/39870867/what-does-app-usebodyparser-json-do
app.use(bodyParser.urlencoded({
    extended: true
}));
var port = process.env.PORT || 8000;
var data = JSON.parse(fs.readFileSync('./todos.json', 'utf8'));
function write(){
  fs.writeFileSync('./todos.json', JSON.stringify(data));
}

app.use(express.static(__dirname + '/public'));


//if the user wants to read.
app.get('/read', function(req, res){
  res.send(data);
})

app.post('/add', function(req, res){
  var newObj = req.body;
  console.log('Added Obj:', req.body);
  newObj.completed = JSON.parse(req.body.completed);
  data.push(newObj);
  write();
  res.send('Added data!');
})

app.put('/update/', function(req, res){
    var changeItem = data.filter(function(cur){
      return cur.id == req.body.id;
    })
    changeItem[0].title = req.body.title;
    changeItem[0].completed = req.body.completed;
    console.log(changeItem);
    write();
    res.send('Data updated!')
})

app.delete('/delete', function(req, res){
  var id = req.body.id;
  var changeItem = data.filter(function(cur){
    return cur.id == req.body.id;
    })
    var i = data.indexOf(changeItem[0]);
    data.splice(i, 1);
    write();
    res.send(data);
})

//Listen
app.listen(port, function(){
  console.log('listening on:', port);
})
