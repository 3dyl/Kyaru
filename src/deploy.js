const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const k=process.env;


const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('a ver uwu!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(k.DiscordToken);

rest.put(Routes.applicationGuildCommands(k.clientId, k.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
