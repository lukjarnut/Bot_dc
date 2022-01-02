#!/usr/bin/env node

require('dotenv').config();

const mysql = require('mysql2');
const schedule = require('node-schedule');

const giphs = require('./giphs');
const get_date = require('./mods/date');
const check_config = require('./mods/check_config');

let pojedynek_avaible = true;
let update_avaible = true;

const {Client, Intents} = require('discord.js');
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	] });

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
	if(newVoiceState.channel != null){
		if  ((newVoiceState.channel.id === '848546786032615436') ||
				(newVoiceState.channel.id === '848546824498315274') ||
				(newVoiceState.channel.id === '849004787188891659') ||
				(newVoiceState.channel.id === '848546799186214962')){
					return(true)}
		else{
			return (false)
		}
	}
}

function getRandom(max) {
	return Math.floor(Math.random() * max);
  }


client.on("voiceStateUpdate", async (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
	if(newVoiceState.channel != null){
		let timeout = 1200;
		let timeout_afk = 5*60000;
		//ping pong
		const state = await check_config("ping_pong", promisePool);
		if(state == 'true'){
		if(newVoiceState.member.id === '364442363277475841' && still_ping_pong(newVoiceState)){
			newVoiceState.setChannel(oldVoiceState.channel);
		}
	    if (newVoiceState.channel.id === '848546786032615436') {
	        setTimeout(() => {
						if(still_ping_pong(newVoiceState)){
	            newVoiceState.setChannel('848546824498315274')
	            .catch(console.error);
	        }}, timeout);
	        console.log(`${newVoiceState.member.user.tag} Gra w pingponga xD`);
	    }
	    else if (newVoiceState.channel.id === '848546824498315274') {
	        setTimeout(() => {
						if(still_ping_pong(newVoiceState)){
	            newVoiceState.setChannel('849004787188891659')
	            .catch(console.error);
	        }}, timeout);
	    }
	    else if (newVoiceState.channel.id === '849004787188891659') {
	        setTimeout(() => {
						if(still_ping_pong(newVoiceState)){
	            newVoiceState.setChannel('848546799186214962')
	            .catch(console.error);
	        }}, timeout);
	    }
	    else if (newVoiceState.channel.id === '848546799186214962') {
	        setTimeout(() => {
						if(still_ping_pong(newVoiceState)){
	            newVoiceState.setChannel('848546786032615436')
	            .catch(console.error);
	        }}, timeout);
	    }
		}
		//bryg

		else if (newVoiceState.channel.id === '804802571172708423') {
	        setTimeout(() => {
		if (newVoiceState.channelID === '804802571172708423'){
	            newVoiceState.member.voice.setChannel('848546786032615436')
	            .catch(console.error);
						}
	        }, timeout_afk);
	    }
		}
});

const pojedynek_job = schedule.scheduleJob('*/10 * * * * *', function () {
			 pojedynek_avaible = true;
})

const member_update_job = schedule.scheduleJob('*/2 * * * * *', function () {
			 update_avaible = true;
})


client.on('guildMemberUpdate', async (oldUser, newUser) => {
	if(update_avaible){

	  //if (oldUser.nickname !== newUser.nickname) console.log(`${oldUser.nickname}'s new username is ${newUser.nickname}!`)
		//console.log("username: " + newUser.user.username + " #" + newUser.user.id + " nickname: " + newUser.nickname);
			try {
				if(newUser.user.id === '481926912906887168' && update_avaible){
						newUser.setNickname("Leczo ekipy");
						update_avaible=false;
						}
			//message.guild.members.cache.forEach(member => {
		//	if(newUser.user.id === '619597863319633973' && update_avaible){
		//			newUser.setNickname("Horwacja");
			//	}
			//message.guild.members.cache.forEach(member => {

			}
			catch (e){
				console.log(e);
			}
		//console.log(newUser.user.id);
	}
})

client.on('messageCreate', async message => {
	const author = message.author.id;

	const bye_gif = giphs.bye_gif;
	const no_u_gif = giphs.no_u_gif;
	const wikson_gif = giphs.wikson_gif;

	let pojedynek_time = 10*000;

	let date_ob = new Date();
	let hour = date_ob.getHours();

	if (hour > 2 && hour < 4){
	//	message.channel.send({files: ["https://i.imgur.com/5xsFqXy.png"]});
	}

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if(!message.content.startsWith(process.env.PREFIX)) return;

	if (command === 'test') {
		/*try {
		message.guild.members.cache.forEach(member => {
		if(member.id === '619597863319633973'){
				member.setNickname("wiksson");
				}
			});
		}
		catch (e){
			console.log(e);
		}*/
		message.channel.send('Działam. Działam. Spokojnie...');
	}
	else if(command == 'aco' || message.author.id === '619597863319633973'){ //Wikson
		if (await check_config("wikson", promisePool) == "true"){
			if (getRandom(100) <= 44){
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
/*
	if (command === 'test_embed') {
		let date_ob = new Date();
		const embed_test = new Discord.MessageEmbed()
			.setColor('#0000ff')
			.setTitle('Ziobro ty kurwo jebana')
			.setDescription('Stanowski to też menda')
			.addFields(
				{ name: 'nazwa pola', value: 'zawartosc pola'},
				{ name: 'pole pole', value: 'łyse pole', inline: true}
				)
			//.setImage('http://i.imgur.com/8MTwUpy.jpeg')
			.setFooter(get_date());
		message.channel.send(embed_test);
	}
	*/
	else if(command === 'drumek_out' && await check_config("drumek", promisePool) == "true"){
		message.delete();
		message.guild.members.cache.forEach(member => {

			if(member.id === '591261870950973450'){
			member.voice.setChannel(null);

			message.channel.send(bye_gif[getRandom(bye_gif.length)]);
			message.channel.send(`Pa Pa Drumek. od: ${message.author.toString()}`);
			}
		});
	}
	else if(command === 'pojedynek' || command === 'fight'){

		if(pojedynek_avaible){
			pojedynek_avaible = false
			const tagged_user = message.mentions.members.first().id;
			const tagging_user = message.author.id;

			if (message.mentions.members.size){
				if (getRandom(100) < 50){
				message.guild.members.cache.forEach(member => {
					if(member.id === tagging_user){
						member.voice.setChannel(null);
						message.channel.send(no_u_gif[getRandom(no_u_gif.length)]).then(() =>
						message.channel.send("<@" + tagging_user + "> przegrał/-a pojedynek z <@" + tagged_user + ">"));
						}
					});
				}
				else{
					message.guild.members.cache.forEach(member => {
					if(member.id === tagged_user){
						member.voice.setChannel(null);
						message.channel.send(bye_gif[getRandom(bye_gif.length)]).then(() =>
						message.channel.send("<@" + tagging_user + "> wygrał/-a pojedynek z <@" + tagged_user + ">"));
						}
					});
				}
			}
			else{
				message.channel.send('Nie ma takiej osoby na czacie głosowym');
			}
	}
	else{
			message.channel.send('Kurwa poczekać. Nie tak często.');
	}

}
    else if (command === 'ds' && author === '364442363277475841'){
	const state = await check_config("wikson", promisePool);
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

	else if (command === 'pp' && author === '364442363277475841'){
		const state = await check_config("ping_pong", promisePool);
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

    else if(message.author.id === '591261870950973450' && await check_config("drumek", promisePool) == "true"){ //Drumek
			if (getRandom(100) <= 16){
	        	message.react('😡').catch(console.error);
			}
    }

	else if (message.author.id === '235148962103951360' && await check_config("carl_bot", promisePool) == "true"){
		if (message.content === 'ale co' || message.content === 'Ale co'){
			message.delete();
		}
		else if (message.content === 'rrrrraaawwrrrr'){
			message.delete();
		}
	}

});

client.login(process.env.TOKEN);
