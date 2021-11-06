const info = {
    name: 'ready',
    once: true
}

function execute(client){
    console.log("tuturu");
    client.user.setActivity('a ver',{type: 'PLAYING'});
}

export {info,execute}
