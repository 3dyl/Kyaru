import  {REST} from '@discordjs/rest';
import{ Routes } from 'discord-api-types/v9';
import 'dotenv/config'

const k=process.env;


const commands = [
    {
        name: 'ping',
        description: 'Responde con pong!'
    }
];

const rest = new REST({ version: '9' }).setToken(k.DiscordToken);

rest.put(Routes.applicationGuildCommands(k.clientId, k.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
