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

module.exports = still_ping_pong;