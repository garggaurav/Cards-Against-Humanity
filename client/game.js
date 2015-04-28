
Template.game.helpers({
	myTemplate: function(){
		if(player.czar==false)
			return "selectedCards";
		return "selectedCardsCzar";
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
		else
			return ["YOU ARE THE CZAR"];
	}
});

Template.whiteCard.events({
	'click .whiteSelect' : function(e) {
        var clickedButton = e.currentTarget;
        var cardSelected = $(clickedButton).val();
        var cardObj = document.getElementsByClassName("whiteSelect"); //All Radio buttons

        if(player.cardSelected == null && player.czar == false)
        	Meteor.call("selectCard", game._id, {card: cardSelected, player: Meteor.userId()})
        //Disable all buttons after selection
        $.map(cardObj, function (obj){
        	obj.disabled = true;
        });
    }
});

Template.selectedCards.helpers({
	chosenCards: function(){
		game = Games.find({_id:this._id}).fetch()[0];
		if(player.czar == false)
			return [player.cardSelected];
	}
});

