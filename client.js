var prompt = require('prompt');
var WebSocket = require('ws')

prompt.start();
var wsServer = null
function run(){
    status = 0
    prompt.get(['message'], function(err, result){
        if(result.message == "exit"){
            status = 2
            wsServer.close();
        }
        else if (result.message == "start"){
            status = 1
            wsServer = new WebSocket("ws://34.235.193.72:8001/");
            wsServer.on('open', function(){
                wsServer.send('Hello');
                console.log("handshake")   
            });
            wsServer.on('message', function(message){
                console.log(message);
            });
        }
        else{
            try{
                wsServer.send(result.message);
            }
            catch (exc){
                console.log(exc)
            }
        }
        console.log("finish session");
        run();
    });
}

run();
