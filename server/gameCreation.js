GameFactory = {};


WHITECARDSNO = 10;

GameFactory.createGame = function (playerId) {
	console.log("Game creation called.");
	var wdeck = createWDeck();
	var bdeck = createBDeck();
	var players = [createPlayer(playerId)];
	var playerIds = [playerId];
	var creatorName = Meteor.user();

	players[0].czar = true; // Set first player to be the czar.

	GameFactory.dealPlayers(players, wdeck);
	var table = bdeck.shift();
	console.log("Game created and returned.");
	return {
		black_deck: bdeck,
		white_deck: wdeck,
		players: players, //[Object,...,Object]
		playerIds: playerIds,
		table: table,
		czar: players[0], //Object
		inProgress: true,
		started: new Date(), 
		numPlayers: 1,
		thisWinner: null, //{player: Object, cardQuote: String}
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
	var game = Games.find({ _id: GameId}).fetch()[0];
	//Add if player is not already in game and number of players is less than max.
	if(game.playerIds.indexOf(playerId)==-1) 
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
		return game;
	}
}

//card = {card: cardSelected, player: Meteor.userId()}
GameFactory.addCard = function(gameId, card)
{
	var game = Games.find({ _id: gameId}).fetch()[0];
	game.chosenCards.push(card);

	playersArr = game.players;
	player = playersArr.filter(function (obj) {
	    return obj.id == Meteor.userId();
	})[0];
	player.cardSelected = card;
	player.hand.splice(player.hand.indexOf(card.card),1); //Remove card from player's hand
	game.white_deck.push(card.card); //Add card back to white deck
	return game;
}

GameFactory.nextTurn = function(gameId, callerId)
{
	var game = Games.find({_id: gameId}).fetch()[0];
	if(callerId !== game.czar.id)
	{
		console.log("You are not the Czar");
		return game;
	}
	var flag = 0;
	game.chosenCards = [];
	game.table = game.black_deck.shift();

	for(var i=0; i<game.players.length; i++)
	{
		game.players[i].cardSelected = null;

		if(game.czar.id === game.players[i].id && flag==0)
		{
			game.czar = game.players[(i+1) % game.numPlayers]; //Next player becomes czar
			console.log((i+1) % game.numPlayers);
			game.players[i].czar = false;
			game.players[(i+1)%game.numPlayers].czar = true;
			flag = 1; //Czar is set.
		}
	}
	game.thisWinner = null;
	return game;
}

// gameId:String, playerId:String, card:String
GameFactory.selectWinner = function(gameId, playerId, card)
{
	var game = Games.find({ _id: gameId}).fetch()[0];	
	playersArr = game.players;
	player = playersArr.filter(function (obj) {
	    return obj.id == playerId;
	})[0];

	if (game.thisWinner == null) //Game does not already have a winner
	{
		game.thisWinner = {player: player, cardQuote: card};
		player.score += 10;
	}
	return game;
}

function createPlayer(id) {
	var o = {
	id: id,
	hand: [],
	score: 0,
	czar: false,
	cardSelected: null,
	username: Meteor.user().username
	};

	return o;
}

function createWDeck() {
	return _.shuffle(wCards);
}

function createBDeck() {
	return _.shuffle(bCards);

}