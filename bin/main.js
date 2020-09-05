#! /usr/bin/env node
const childProcess = require("child_process");
const config = require("../lib/config");
const { sleep } = require("../lib/utils");
const inquirer = require('inquirer');

const addIDE = (alias, path) => {
	const ides = config.get("ide");
	ides.push({
		alias,
		path,
		creation: Date.now()
	});
	
	config.save();
};

const removeIDE = (alias) => {
	const ides = config.get("ide");
	
	for(let i = 0; i < ides.length; i++){
		if(ides[i].alias === alias){
			ides.splice(i, 1);
			config.save();
			return;
		}
	}
};

const open = async (alias) => {
	const path = process.cwd();
	const ide = getIde(alias);
	if(ide == null){
		console.error(alias + " is not defined.");
		console.warn("Run 'ide-open add [alias] [path]' to create new editor");
		console.warn("Run 'ide-open list' to list all editors");
		
		return false;
	} else {
		childProcess.exec(`"${ide.path}" "${path}"`);
		await sleep(100);
		
		return true;
	}
};

const listIde = () => {
	const ides = config.get("ide");
	if(ides.length < 1){
		console.log("There are no editors configured");
	} else {
		for(let i = 0; i < ides.length; i++){
			console.log("Alias: " + ides[i].alias);
			console.log("Path: " + ides[i].path);
			console.log("<-------------------->");
		}
	}
};

const askAlias = async () => {
	const ides = config.get("ide");
	if(ides.length === 0){
		console.log("You don't have any editor associated with open-ide");
	} else if(ides.length === 1){
		console.log("Only one editor is present, I will use it");
		await open(ides[0].alias);
	} else {
		const aliases = [];
		for(let i = 0; i < ides.length; i++){
			aliases.push(ides[i].alias);
		}
		aliases.push("cancel");
		
		const answers = await inquirer.prompt([
			{
				type: 'list',
				name: 'ide',
				message: 'Choose editor:',
				choices: aliases
			}
		]);
		if(answers["ide"] !== "cancel"){
			await open(answers["ide"]);
		}
	}
};

const getIde = (alias) => {
	const ides = config.get("ide");
	
	for(let i = 0; i < ides.length; i++){
		if(ides[i].alias === alias){
			return ides[i];
		}
	}
	
	return null;
};

// EXECUTION
const execute = async () => {
	try {
		const args = process.argv.slice(2, process.argv.length);
		if (args.length < 1) {
			//open default
			await askAlias();
		} else if (args[0] === "add") {
			addIDE(args[1], args[2]);
		} else if (args[0] === "rm") {
			removeIDE(args[1]);
		} else if (args[0] === "list") {
			listIde();
		} else {
			await open(args[0]);
		}
		
		return 0;
	} catch (e) {
		console.error(e);
		return 1;
	}
};

execute().then((code) => {
	process.exit(code);
});