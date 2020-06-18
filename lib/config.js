const fs = require('fs-extra');
const HOMEDIR = require('os').homedir();

const conf_path = HOMEDIR + "/ideopen";

const data = {
	loaded: false,
	config: {
		ide: []
	}
};

const load = () => {
	try {
		const json = fs.readFileSync(conf_path + "/config.json");
		data.config = JSON.parse(json);
	} catch (e) {
		console.error(e);
	}
	
	data.loaded = true;
};

const save = () => {
	try {
		fs.ensureDirSync(conf_path);
		fs.writeFileSync(conf_path + "/config.json", JSON.stringify(data.config));
	} catch (e) {
		console.error(e);
	}
};

const get = (prop) => {
	if(!data.loaded){
		load();
	}
	
	return data.config[prop];
};

const set = (prop, value) => {
	data.config[prop] = value;
};

module.exports = {
	load,
	save,
	get
};