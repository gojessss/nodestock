//Stock Market Portfolio App 

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 5000; 

//Use body parser middleware 
app.use(bodyParser.urlencoded({extended: false}));

//API KEY pk_9617206ab9ca4903838cb907032603f1
//create call API function 

function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_9617206ab9ca4903838cb907032603f1', { json:true }, (err, res,body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
		};
	});

};



//Set handlebars middleware 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "This is other stuff"

//Set handlebar index GET routes 
app.get('/', function (req, res) {
	call_api(function(doneAPI) { 
		  res.render('home', {
    	stock: doneAPI
    	});
	});
});

//Set handlebar index POST routes 
app.post('/', function (req, res) {
	call_api(function(doneAPI) { 
		//posted_stuff = req.body.stock_ticker;
		  res.render('home', {
    	stock: doneAPI,
    	});
	}, req.body.stock_ticker);
});



//Set static folder 
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log("Server Listening on port " + PORT));

