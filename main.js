#!/usr/bin/env node

require('dotenv').config();

const Discord = require('discord.js');
const mysql = require('mysql2');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Bot ready to work!');
});


const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_UNAME,
	password: process.env.MYSQL_PASSWD,
	database: process.env.MYSQL_DB,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
  });
const promisePool = pool.promise();

function still_ping_pong(newVoiceState){
	if  ((newVoiceState.channelID === '848546786032615436') ||
			(newVoiceState.channelID === '848546824498315274') ||
			(newVoiceState.channelID === '849004787188891659') ||
			(newVoiceState.channelID === '848546799186214962')){
				return(true)}
	else{
		return (false)
	}
}

function getRandom(max) {
	return Math.floor(Math.random() * max);
  }

async function check_config(person){
	try{
	const [rows, fields] = await promisePool.execute("SELECT state FROM states");
	if (person === "wikson") return(rows[0].state);
	else if (person === "drumek") return(rows[1].state);
	else if (person === "ping_pong") return(rows[2].state);
	else if (person === "carl_bot") return(rows[3].state);
	}
	catch(err){
		console.log(err);
	}
}

let bye_gif = ['https://tenor.com/view/puffybear-puffy-face-cute-bye-gif-12628645',
'https://gph.is/2RY0k2q',
'https://tenor.com/view/im-out-goodbye-bye-bye-bye-im-done-sorry-gif-17148570',
'https://gph.is/g/4bvYRbL',
'https://media.giphy.com/media/TUJyGPCtQ7ZUk/giphy.gif',
'https://media.giphy.com/media/i67uIY4a61ejm/giphy.gif',
'https://media.giphy.com/media/3o7WICht89LQdQZa2A/giphy.gif'
]

let no_u_gif = ['https://media.giphy.com/media/cXblnKXr2BQOaYnTni/giphy.gif',
'https://media.giphy.com/media/3o7TKEdVH8csXxKDO8/giphy.gif',
'https://media.giphy.com/media/bQC7ZxmQ3LdLO/giphy.gif',
'https://media.giphy.com/media/3o7TKr1ZOGWM32HvWg/giphy.gif',
'https://media.giphy.com/media/WxF8QLNOeQE6I/giphy.gif',
'https://i.imgur.com/Ng23RtJ.png'
]


client.on("voiceStateUpdate", async (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
    let timeout = 1200;
		let timeout_afk = 5*60000;

		//ping pong
		const state = await check_config("ping_pong");
		if(state == 'true'){
		if(newVoiceState.member.id === '364442363277475841' && still_ping_pong(newVoiceState)){
			newVoiceState.member.voice.setChannel(oldVoiceState.channelID);
		}
	    if (newVoiceState.channelID === '848546786032615436') {
	        setTimeout(() => {
							if(still_ping_pong(newVoiceState)){
	            newVoiceState.member.voice.setChannel('848546824498315274')
	            .catch(console.error);
	        }}, timeout);
	        console.log(`${newVoiceState.member.user.tag} Gra w pingponga xD`);
	    }
	    else if (newVoiceState.channelID === '848546824498315274') {
	        setTimeout(() => {
							if(still_ping_pong(newVoiceState)){
	            newVoiceState.member.voice.setChannel('849004787188891659')
	            .catch(console.error);
	        }}, timeout);
	    }
	    else if (newVoiceState.channelID === '849004787188891659') {
	        setTimeout(() => {
							if(still_ping_pong(newVoiceState)){
	            newVoiceState.member.voice.setChannel('848546799186214962')
	            .catch(console.error);
	        }}, timeout);
	    }
	    else if (newVoiceState.channelID === '848546799186214962') {
	        setTimeout(() => {
							if(still_ping_pong(newVoiceState)){
	            newVoiceState.member.voice.setChannel('848546786032615436')
	            .catch(console.error);
	        }}, timeout);
	    }
		}

		//bryg
		else if (newVoiceState.channelID === '804802571172708423') {
	        setTimeout(() => {
						if (newVoiceState.channelID === '804802571172708423'){
	            newVoiceState.member.voice.setChannel('848546786032615436')
	            .catch(console.error);
						}
	        }, timeout_afk);
	    }
});

client.on("presenceUpdate", (oldMember, newMember) => {
    console.log(`a guild member's presence changes`);
});

client.on('message', async message => {

	let date_ob = new Date();
	let hour = date_ob.getHours();

	if (hour > 2 && hour < 4){
	//	message.channel.send({files: ["https://i.imgur.com/5xsFqXy.png"]});
	}

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'test') {
		message.channel.send('Działam. Działam. Spokojnie...');
	}
	else if(command === 'drumek_out'){
		message.delete();
		message.guild.members.cache.forEach(member => {
		if (getRandom(100) <= 50){
			if(member.id === message.author.id){
				member.voice.setChannel(null);

				if(message.author.id == '619597863319633973'){ //Wikson
					message.channel.send('https://media.giphy.com/media/HS6QSDFMQa4OA/giphy.gif').then(() =>
					client.channels.cache.get('804802612171767828').send(`Pa Pa ${message.author.toString()}`));
				}
				else{
					message.channel.send(no_u_gif[getRandom(no_u_gif.length)]).then(() =>
					client.channels.cache.get('804802612171767828').send(`Pa Pa ${message.author.toString()}`));
				}
			}
		}
		else{
			if(member.id === '591261870950973450'){
			member.voice.setChannel(null);

			message.channel.send(bye_gif[getRandom(bye_gif.length)]);
			client.channels.cache.get('804802612171767828').send(`Pa Pa Drumek. od: ${message.author.toString()}`);
			}
		}
		});
	}
    else if (command === 'ds'){
		const state = await check_config("wikson");
        if (state === 'false'){
            message.channel.send('Sie robi szefie. Można zaczepiać').then(msg => {message.delete({timeout:"500"})});
			try{
				await promisePool.execute('UPDATE states SET state = "true" WHERE name = "denerwowanie_wikson";');
			}
			catch(err){
				console.log(err);
			}
        }
        else{
            message.channel.send('Sie robi szefie. Będzie spokój').then(msg => {message.delete({timeout:"500"})});
			try{
				await promisePool.execute('UPDATE states SET state = "false" WHERE name = "denerwowanie_wikson";');
			}
			catch(err){
				console.log(err);
			}
		}
    }

	else if (command === 'pp'){
		const state = await check_config("ping_pong");
        if (state === 'false'){
            message.channel.send('Ping pong włączony').then(msg => {message.delete({timeout:"500"})});
			try{
				await promisePool.execute('UPDATE states SET state = "true" WHERE name = "ping_pong";');
			}
			catch(err){
				console.log(err);
			}
        }
        else{
            message.channel.send('Ping pong wyłączony').then(msg => {message.delete({timeout:"500"})});
			try{
				await promisePool.execute('UPDATE states SET state = "false" WHERE name = "ping_pong";');
			}
			catch(err){
				console.log(err);
			}
		}
    }

    else if(command == 'aco' || message.author.id === '619597863319633973'){ //Wikson
			if (await check_config("wikson") == "true"){
				if (getRandom(100) <= 14){
				message.react('🇦')
				.then(() => message.react('🇱'))
				.then(() => message.react('🇪'))
				.then(() => message.react('🟦'))
				.then(() => message.react('🇨'))
				.then(() => message.react('🇴'))
				.then(() => message.react('❓'))
				.catch(console.error);
						console.log(`${message.author.tag} mowi, ale co`);
				}
			}
    }

	else if((message.content.toLowerCase().includes("wyłącz") || message.content.toLowerCase().includes("wylacz")
					|| message.content.toLowerCase().includes("wyłacz") || message.content.toLowerCase().includes("wylącz"))
					&& message.content.toLowerCase().includes("bota")){
		message.react('🇳')
			.then(() => message.react('🇮'))
			.then(() => message.react('🇪'))
			.then(() => message.react('🙂'))
			.catch(console.error);
					console.log(`${message.author.tag} czepia się bota`);
	}

    else if(message.author.id === '591261870950973450'  && await check_config("drumek") == "true"){ //Drumek
			if (getRandom(100) <= 16){
	        	message.react('😡').catch(console.error);
			}
    }

	else if (message.author.id === '235148962103951360' && await check_config("carl_bot") == "true"){
		if (message.content === 'ale co' || message.content === 'Ale co'){
			message.delete();
		}
		else if (message.content === 'rrrrraaawwrrrr'){
			message.delete();
		}
	}

});

client.login(process.env.TOKEN);
