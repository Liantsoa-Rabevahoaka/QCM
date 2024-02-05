const http = require('http');
const app = require('./app');
const port = 3003;

app.set('port', process.env.PORT || port);
const server = http.createServer(app);

server.listen(process.env.PORT || port, function(){
    console.log('Serveur démarré');
});
