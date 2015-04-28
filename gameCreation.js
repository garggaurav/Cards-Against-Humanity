GameFactory = {};


WHITECARDSNO = 9;

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
		createdBy: creatorName,
		chosenCards: []
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
	console.log("Add player called on " +GameId);
	var game = Games.find({ _id: GameId}).fetch()[0];
	console.log("Game to be added to: "+GameId);
	console.log("Player to be added: "+playerId);
	//Add if player is not already in game and number of players is less than max.
	if(game.playerIds.indexOf(playerId)==-1 && game.numPlayers <= NUMPLAYERS) 
	{
		var player = createPlayer(playerId);
		game.players.push(player);
		game.playerIds.push(playerId);
		game.numPlayers+=1;
		GameFactory.dealPlayers(game.players, game.white_deck);
		console.log("PLayer added. "+game.numPlayers);
		return game;
	}
	else
	{
		console.log("Player not added. "+game.numPlayers);
	}
}

GameFactory.addCard = function(gameId, card)
{
	var game = Games.find({ _id: gameId}).fetch()[0];
	console.log("Card Selected: "+card);
	game.chosenCards.push(card);

	playersArr = game.players;
	player = playersArr.filter(function (obj) {
	    return obj.id == Meteor.userId();
	})[0];
	player.cardSelected = card;
	player.hand.splice(player.hand.indexOf(card.card),1);
	game.white_deck.push(card.card);
	return game;
}

function dealTable(black_deck) {
	return black_deck.shift();
}


function createPlayer(id) {
	var o = {
	id: id,
	hand: [],
	score: 0,
	czar: false,
	cardSelected: null
	};

	return o;
}

function createWDeck() {
	return _.shuffle(wCards);
}

function createBDeck() {
	return _.shuffle(bCards);

}