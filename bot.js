import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { deploy } from "./deploy-commands.js";
import * as hello from "./commands/hello.js";

config();

// Deploy Commands
await deploy();

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, () => {
	console.log("ready as:\n" + client.user.tag);
});

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isCommand()) return;
	switch (interaction.commandName) {
		case "hello":
			await hello.execute(interaction);
			break;
	}
});
