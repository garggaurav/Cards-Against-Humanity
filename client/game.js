Template.blackCard.helpers({
	cards: function (){
		console.log("Black cards of Game: "+ this._id);
		var playersArr = Games.find({_id:this._id}).fetch()[0].players;
		console.log(playersArr);
		var player = playersArr.filter(function (obj) {
		    return obj.id == Meteor.userId();
		})[0];
		console.log(player);

		return player.hand;
	}

});