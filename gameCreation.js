GameFactory = {};


var WHITECARDSNO = 3;

GameFactory.createGame = function (playerIds) {
	var wdeck = createWDeck();
	var bdeck = createBDeck();
	var players = createPlayers(playerIds);

	GameFactory.dealPlayers(players, wdeck);
	var table = dealTable(bdeck);
	
	return {
		black_deck: bdeck,
		white_deck: wdeck,
		players: players,
		table: table,
		czar: playerIds[0],
		inProgress: true,
		started: new Date()
	};

};

GameFactory.dealPlayers = function (players, white_deck) {

	for (var i=0; i<3; i++) {
		Object.keys(players).forEach(function (id) {
			while(players[id].hand.length <= WHITECARDSNO) {
			players[id].hand.push(white_deck.shift());
		}
		});
	}
};


function dealTable(black_deck) {

	return black_deck.shift();

}


function createPlayers(ids) {
	var o = {};

	ids.forEach(function (id) {
		o[id] = {
		hand: [],
		score: 0,
		czar: false
		}
	  });

	return o;
}

function createWDeck() {

var wCards = [
"Flying sex snakes.",
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