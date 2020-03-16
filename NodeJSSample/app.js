var express = require('express');
var request = require('request');
var app = express();


app.set('view engine', 'pug')

app.get('/', function (req, res) {
   //res.send('Hello World');
   const options = {
    method: 'POST',
    uri: 'https://directline.botframework.com/v3/directline/tokens/generate',
    headers: {
        'Authorization': 'Bearer ' + "<Bot-Directline-Secret>"
    },
    json: {
        User: { Id: userId }
    }
};
request.post(options, (error, response, body) => {
    if (!error && response.statusCode < 300) {
        res.render('index', { 
            title: "Webchat Test",
            token: body.token,
            userId: userId
        })
        /*res.json({ 
                token: body.token,
                userId: userId
            });*/
    }
    else {
        res.status(500).send('Call to retrieve token from Direct Line failed');
    } 
});
   
})


var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})


var router = express.Router(); // get an instance of the express Router
// Get a directline configuration (accessed at GET /api/config)
const userId = "dl_" + 1;
app.get('/config', function(req, res) {
    const options = {
        method: 'POST',
        uri: 'https://directline.botframework.com/v3/directline/tokens/generate',
        headers: {
            'Authorization': 'Bearer ' + "<Bot-Directline-Secret>"
        },
        json: {
            User: { Id: userId }
        }
    };
    request.post(options, (error, response, body) => {
        if (!error && response.statusCode < 300) {
            res.json({ 
                    token: body.token,
                    userId: userId
                });
        }
        else {
            res.status(500).send('Call to retrieve token from Direct Line failed');
        } 
    });
});