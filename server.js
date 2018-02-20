var http     = require('http'),
	express  = require('express'),
    parser   = require('body-parser');
    
var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 8080);

//Load states.json in a dictionary
var stateBoundaries = require("./states.json");

app.post('/', function (req,res) {
    var response = [];  
    var lat = req.body.latitude
    var long = req.body.longitude
    var found = false

//Traverse all the states 
    for(i in stateBoundaries.states){
        var stateData = (stateBoundaries.states[i]);
        var boundaries = stateData.border;

        if(pointInPolygon(boundaries, long, lat)==true){
            found = true
            response.push(stateData.state);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        }
    }
//If not found returns NOT FOUND
    if(found == false){
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify({"message":"Not in any U.S. state"}));
    }
});

//Creates the server 
http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});


//Check if the coordinates are inside the polygon formed by boundaries of the state
//Some errors for places located near or on the state boundaries(eg. NYC) exist. But overall a decent result for most places.
//Used this link as a reference for this function http://alienryderflex.com/polygon/

function pointInPolygon(boundaries, x, y) {

  var polyCorners = boundaries.length
  var   i, j=polyCorners-1 ;
  var  oddNodes=false;

  for (i=0; i<polyCorners; i++) {
    if ((boundaries[i][1]< y && boundaries[j][1]>=y 
         ||   boundaries[j][1]< y && boundaries[i][1]>=y) &&  (boundaries[i][0]<=x || boundaries[j][0]<=x)) {
        oddNodes^=(boundaries[i][0]+(y-boundaries[i][1])/(boundaries[j][1]-boundaries[i][1])*(boundaries[j][0]-boundaries[i][0])<x); }
        j=i; 
    }

  return oddNodes; 
}