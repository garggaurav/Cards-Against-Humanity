Template.gameList.helpers({
	games: function() {
	return Games.find({inProgress:true});
}});

Template.gameItem.events({
	'submit form': function (evt) {
		console.log("Join Game attempted");
		Meteor.call('joinGame', this._id , Meteor.userId());
	}
});

Template.newGame.events({
	'click button': function (evt, template) {
		Meteor.call('createGame', Meteor.userId());
	}
});