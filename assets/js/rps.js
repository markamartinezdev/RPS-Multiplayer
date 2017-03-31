  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBXMFyKQYY572zgctVjDA2TWzaCInlBqYc",
    authDomain: "rps-multiplayer-9bf74.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-9bf74.firebaseio.com",
    storageBucket: "rps-multiplayer-9bf74.appspot.com",
    messagingSenderId: "655906869395"
  };
  firebase.initializeApp(config);

database = firebase.database();


$('#addMess').click(addMessege);

database.ref().on('value', function(snapshot){
	if(snapshot.val().playerOne === 'active' && snapshot.val().playerTwo === 'active'){

		alert('game in progres start over?');

};	
console.log(snapshot.val().playerOne);
});




function startNewGame() {
    $('#sectionOne').empty();
    $('#sectionOne').append('<div id="playerChoice" class="col-md-4"> </div> <div class="col-md-4"> </div> <div id="opponentChoice" class="col-md-4"> <h2>Waiting for player 2 </h2></div>');
}

function addMessege(){
	playermessage = $('#enterMess').val();
	$('#chat').append('<p>' + playermessage +'</p>');
	$('#enterMess').val('');
}