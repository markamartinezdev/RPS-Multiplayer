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

var player;
var playerChoice;

$('#addMess').click(addMessege);
//checks if game has started
database.ref().on('value', function(snapshot){
 //if there is a started game prompt to reset
	if(snapshot.val().playerOne === 'active' && snapshot.val().playerTwo === 'active'){
    $('#sectionOne').empty();
    $('#sectionOne').append('<div id="gameInProgress" class="col-md-12"></div>');
    $('#gameInProgress').append('<h1>Thers a game in progress! Press reset to start new game.</h1>');
    $('#gameInProgress').append('<button id="reset">reset</button>');
} else {
  //if there is no started game start new game
  startNewGame();
}
});

$('body').on('click', '#reset',startNewGame);
//starts new game 
function startNewGame() {
  database.ref().set({
    playerOne: '',
    playerTwo: ''
  })
database.ref().on('value', function(snapshot){

}

function addMessege(){
	playermessage = $('#enterMess').val();
	$('#chat').append('<p>' + playermessage +'</p>');
	$('#enterMess').val('');
}