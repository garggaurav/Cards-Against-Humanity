Router.configure({
	layoutTemplate: 'layout'
});

Router.map(
	function () {
	this.route('home', { path: '/' });
	this.route('game', {
		path: '/game/:_id',
		data: function(){
			var gameId = this.params._id;
			var game = Games.find({_id: gameId}).fetch()[0];
			return game;
		}
	});
});