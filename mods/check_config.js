async function check_config(person, promisePool){
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
module.exports = check_config;