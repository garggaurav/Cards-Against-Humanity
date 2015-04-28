Games = new Meteor.Collection('games');

if (Meteor.isServer) {
	Meteor.publish('games', function() {
		return Games.find();
	});

	Meteor.publish('users', function() {
		return Meteor.users.find();
	});
}

if (Meteor.isClient) {
	Meteor.subscribe('games');
	Meteor.subscribe('users');
}

Meteor.methods({
createGame: function(userId) {
	var game = GameFactory.createGame(Meteor.userId());
	Games.insert(game);
},

joinGame: function(gameId, userId) {
	game = GameFactory.addPlayer(gameId, Meteor.userId());
	console.log("Update Operation: " +Games.update({_id:gameId}, game));
}, 

selectCard: function(gameId, card){
	game = GameFactory.addCard(gameId, card);
	console.log("Add Card Operation: " +Games.update({_id:gameId}, game));
},

nextTurn: function(gameId, userId){
	game = GameFactory.nextTurn(gameId, userId);
	console.log("Next turn Operation: " +Games.update({_id:gameId}, game));
},

selectWinner: function(gameId, playerId, card){
	game = GameFactory.selectWinner(gameId, playerId, card);
	console.log("Select Winner Operation: " +Games.update({_id:gameId}, game));
}

});