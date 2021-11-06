import fs from 'fs';
import 'dotenv/config';
import logSymbols from 'log-symbols';
import {Client, Intents, Collection} from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.info = process.env;

client.commands = new Collection();

//events manager
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
eventFiles.forEach((file) =>{
    import(`./events/${file}`).then(e =>{
        if(e.info.once){
            client.once(e.info.name, (...args) => e.execute(...args));
        }
        else{
            client.on(e.info.name, async (...args) => e.execute(...args));
        }
    });
})

//commands manager
fs.readdir("./src/commands/",(_err, folders)=>{
    folders.forEach((folder)=>{
        fs.readdir(`./src/commands/${folder}`,(_err, files)=>{
            files.forEach((file)=>{
                if(!file.endsWith(".js")) return;
                import(`./commands/${folder}/${file}`).then( command =>{
                    if(command.info && typeof (command.info.name)=== "string"){
                        if(client.commands.get(command.info.name)){
                            console.warn(` ${logSymbols.warning} 2 o mas comandos tienen el mismo nombre ${command.info.name}.`);
                        }
                        client.commands.set(command.info.name, command);
                        console.log(`${logSymbols.success} cargador comando ${command.info.name}`);
                    }
                    else{
                        console.warn(`${logSymbols.error} Error cargando el comando ${command.info.name}`);
                    }
                });
            });
        });
    });
});


client.login(client.info.DiscordToken);
