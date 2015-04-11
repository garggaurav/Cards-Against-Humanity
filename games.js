
NUMPLAYERS = 3;
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
	GameFactory.addPlayer(gameId, Meteor.userId());
}, 

takeTurn: function(){

}

});