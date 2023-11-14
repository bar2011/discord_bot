import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

config();

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, () => {
	console.log("ready\n" + client.user.tag);
});

client.login(process.env.TOKEN);