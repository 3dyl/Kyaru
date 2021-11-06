const info = {
    name: 'interactionCreate'
}

function execute(interaction){
    //if (!interaction.isCommand()) return;
    console.log("tuturu");
    console.log(`nuevo mensaje de ${interaction.user.tag}`);
}

export {info,execute}
