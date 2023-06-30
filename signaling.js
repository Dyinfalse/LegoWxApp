const WebSocket = require('ws');

const wsServer = new WebSocket.Server({
    port: 8090
})

console.log('ws server on port 8090')

const userMap = new Map();

wsServer.on('connection',function(ws, req) {


    function send (type, data) {
        ws.send(JSON.stringify({
            type, data
        }))
    }

    function sendToUser(user, type, data) {
        let target = userMap.get(user);
        if (target) {
            target.send(JSON.stringify(data))
        } else {
            console.log('user not found');
            send('UserNotFound', {user})
        }
    }

    const controller = {
        Login(data) {
            userMap.set(data.data, ws);
            console.log('当前在线用户:' + userMap.size + '个')
        },
        Invite(data) {
            sendToUser(data.target, 'Invite', data);
        },
        Answer(data) {
            sendToUser(data.target, 'Answer', data);
        },
        Candidate(data) {
            sendToUser(data.target, 'Candidate', data);
        }
    }

    ws.on('message', function(message){
        let data = JSON.parse(message);
        
        if (data.type) {
            controller[data.type] && controller[data.type](data);
        }
    })

    ws.on('close', function  () {
        
    })
})