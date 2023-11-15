import { handleCommands } from "./handle-commands.js";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

config();

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);

client.commands = new Collection();

await handleCommands(client);