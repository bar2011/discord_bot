import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("hello")
	.setDescription("Prints 'Hello'");

export async function execute(interaction) {
	await interaction.reply("Hello");
}

