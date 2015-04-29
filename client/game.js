
Template.header.helpers({
	player: function(){
		game = Games.find({_id:this._id}).fetch()[0];
		playersArr = game.players;
		player = playersArr.filter(function (obj) {
		    return obj.id == Meteor.userId();
		})[0];
		return player;
	},
	game: function(){
		game = Games.find({_id:this._id}).fetch()[0];
		return game;
	},
	playersArr: function(){
		return game.players;
	}
});

Template.game.helpers({
	myTemplate: function(){
		game = Games.find({_id:this._id}).fetch()[0];
		playersArr = game.players;
		player = playersArr.filter(function (obj) {
		    return obj.id == Meteor.userId();
		})[0];
		if(player.czar==false)
			return "selectedCards";
		else
			return "selectedCardsCzar";
	},
	notCzar: function(){
		return player.czar==false;
	}
});

Template.selectedCards.helpers({
	chosenCards: function(){
		game = Games.find({_id:this._id}).fetch()[0];
		if(player.czar == false && game.thisWinner == null)
			return [player.cardSelected];

		//Once the winner has been selected, display all cards.
		for(var i=0; i<game.chosenCards.length; i++)
		{
			if(game.chosenCards[i].card === player.cardSelected.card)
				game.chosenCards[i].card = game.chosenCards[i].card + " (you)";
		}
		return game.chosenCards;
	}
});

Template.selectedCardsCzar.helpers({
	selectedCards: function(){
		return game.chosenCards;
	}
});

Template.whiteCard.helpers({
	cards: function (){
		game = Games.find({_id:this._id}).fetch()[0]
		playersArr = game.players;

		player = playersArr.filter(function (obj) {
		    return obj.id == Meteor.userId();
		})[0];

		if(player.czar == false)
			return player.hand;
	},
	cardSelected: function(){
		return player.cardSelected != null; //returns true if there is a card selected
	}
});

Template.whiteCard.events({
	'click .whiteSelect' : function(e) {
        var clickedButton = e.currentTarget;
        var cardSelected = $(clickedButton).val();
        var cardObj = document.getElementsByClassName("whiteSelect"); //All Radio buttons

        if(player.cardSelected == null && player.czar == false)
        	Meteor.call("selectCard", game._id, {card: cardSelected, player: Meteor.userId()});
    }
});

Template.chosenCardQuote.events({
	'click .chosenSelect': function(e){
		var clickedButton = e.currentTarget;
		var cardSelected = $(clickedButton).val();

		var playerId = game.chosenCards.filter(function (obj) {
		    return obj.card == cardSelected;
		})[0].player;
		console.log("Winner: "+playerId);


		Meteor.call("selectWinner", game._id, playerId, cardSelected);

	}
});

Template.Winner.events({
'click #nextTurn': function(){
	Meteor.call("nextTurn", game._id, Meteor.userId());
	var cardObj = document.getElementsByClassName("whiteSelect"); //All Radio buttons
}
});

Template.Winner.helpers({
	czar: function(){
		return Meteor.userId() === game.czar.id;
	}
});



