Template.gameList.helpers({
	games: function() {
	return Games.find({inProgress:true});
}});

Template.gameItem.events({
	'click button': function (evt, template) {
		console.log(this._id);
		console.log(this.userId);
		Meteor.call('joinGame', this._id , Meteor.userId);
	}
});

Template.newGame.events({
	'click button': function (evt, template) {
		console.log(this.userId);
		Meteor.call('createGame', Meteor.userId);
	}
});