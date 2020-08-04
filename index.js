let express = require('express');
route = require('./routes/routes');

let app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
    next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', route.index);
app.get('/API', route.api);

app.listen(3000);