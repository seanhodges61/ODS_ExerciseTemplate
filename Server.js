var path    = require ("path");
var express = require ("express");
var app     = express ();

app.get ("/uset", function (req, res){
	res.sendFile (path.join (__dirname, "/public/uset/Views/Uset.html"));
});

app.use (express.static ("./public"));

app.listen (80, "192.168.123.173", function(){
  console.log ("Still, you feed us lies from the tablecloth"); //TODO
});