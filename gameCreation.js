GameFactory = {};


var WHITECARDSNO = 3;

GameFactory.createGame = function (playerId) {
	console.log("Game creation called.");
	var wdeck = createWDeck();
	var bdeck = createBDeck();
	var players = [createPlayer(playerId)];
	var playerIds = [playerId];
	var creatorName = Meteor.user();
	players[0].czar = true; // Set first player to be the czar.

	GameFactory.dealPlayers(players, wdeck);
	var table = dealTable(bdeck);
	console.log("Game created and returned.");
	return {
		black_deck: bdeck,
		white_deck: wdeck,
		players: players,
		playerIds: playerIds,
		table: table,
		czar: players[0],
		inProgress: true,
		started: new Date(), 
		numPlayers: 1,
		createdBy: creatorName
	};

};

GameFactory.dealPlayers = function (players, white_deck) {

	for(var i=0; i<players.length; i++)
	{
		while(players[i].hand.length <= WHITECARDSNO)
		{
			players[i].hand.push(white_deck.shift());
		}
	}
};

GameFactory.addPlayer = function (GameId, playerId) {
	var game = Games.find({ _id: GameId}).fetch()[0];
	console.log("Game: "+GameId);
	console.log("Player: "+playerId);
	//Add if player is not already in game and number of players is less than max.
	if(game.playerIds.indexOf(playerId)==-1 && game.numPlayers < NUMPLAYERS) 
	{
		var player = createPlayer(playerId);
		game.players.push(player);
		game.playerIds.push(playerId);
		game.numPlayers+=1;
		console.log("PLayer added. "+game.numPlayers);
	}
	else
	{
		console.log("Player not added. "+game.numPlayers);
	}
}

function dealTable(black_deck) {

	return black_deck.shift();

}


function createPlayer(id) {
	var o = {
	id: id,
	hand: [],
	score: 0,
	czar: false
	};

	return o;
}

function createWDeck() {

var wCards = ["Flying sex snakes.",
"Michelle Obama's arms.",
"German dungeon porn.",
"White people.",
"Getting so angry that you pop a boner.",
"Tasteful sideboob.",
"Praying the gay away.",
"Two midgets shitting into a bucket.",
"MechaHitler.",
"Being a motherfucking sorcerer."];

return _.shuffle(wCards);
}

function createBDeck() {

var bCards = ["_?  There's an app for that.", 
"Why can't I sleep at night?",
"What's that smell?",
"I got 99 problems but _ ain't one.",
"Maybe she's born with it.  Maybe it's _.",
"What's the next Happy Meal&copy; toy?",
"Anthropologists have recently discovered a primitive tribe that worships _.",
"It's a pity that kids these days are all getting involved with _.",
"During Picasso's often-overlooked Brown Period, he produced hundreds of paintings of _.",
"Alternative medicine is now embracing the curative powers of _."];

return _.shuffle(bCards);

}