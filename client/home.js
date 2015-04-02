Template.gameList.helpers({
	
	games: function() {
			
	Games.find({inProgress:true}).map(function (game) 
			{
			game.started = moment(game.started).fromNow();
			return game;
		});
}});

Template.gameItem.events({
	'click button': function (evt, template) {
		Meteor.call('createGame', template.data._id);
	}
});