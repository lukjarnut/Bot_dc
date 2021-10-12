function get_date(){
	let date_ob = new Date();

	// current date
	// adjust 0 before single digit date
	let date = ("0" + date_ob.getDate()).slice(-2);

	// current month
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

	// current year
	let year = date_ob.getFullYear();

	let hours = date_ob.getHours();
	// current hours
	if (hours > 10){
		hours = date_ob.getHours();
	}
	else{
		hours = "0" + date_ob.getHours();
	}

	// current minutes
	let minutes = date_ob.getMinutes();
	if (minutes > 10){
		minutes = date_ob.getMinutes();
	}
	else{
		minutes = "0" + date_ob.getMinutes();
	}

	// current seconds
	let seconds = date_ob.getSeconds();
	if (seconds > 10){
		seconds = date_ob.getSeconds();
	}
	else{
		seconds = "0" + date_ob.getSeconds();
	}

	return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

}

module.exports = get_date;