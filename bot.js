import * as fs from "fs";
import * as path from "path";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

config();

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

client.cooldowns = new Collection();
client.commands = new Collection();

// Get command files and add to collection
const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
	const commandsPath = path.join("./commands", folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = await import(`./commands/${folder}/${file}`);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`[WARNING] The command at ./commands/${folder}/${file} is missing a required "data" or "execute" property.`
			);
		}
	}
}

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = await import(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.TOKEN);