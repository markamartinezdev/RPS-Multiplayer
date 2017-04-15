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

  var playerNumber;
  var playerChoice;
  var madeChoice = false;
  var wins = 0;
  var losses = 0;
  var player;
  var opponent;

  //check if game is started
  database.ref().once("value", function(snapshot) {
      //if game is started reset
      numerOfPlayers = snapshot.numChildren();
      if (numerOfPlayers >= 2) {
          resetGame();
          console.log(snapshot[0]);
      } else {
          setPlayer();
      }
  });
  //reset game
  function resetGame() {
      database.ref().remove();
      event.preventDefault();
      setPlayer();
  }

  //set players (one or two)
  function setPlayer() {
      //if player1 exists then player is 2
      database.ref().once('value', function(snapshot) {

          if (snapshot.child('/player1').exists()) {
              playerNumber = '2';
          } else {
              playerNumber = '1';
          }
          database.ref('player' + playerNumber).set({
              choice: "none",
              wins: 0
          });
          console.log(playerNumber);
      });
  }

  //player chooses attack option
  $('.option').on('click', function() {
      //set selected as players choice
      playerChoice = $(this).find('img').attr('alt');
      console.log(playerChoice);
      if (madeChoice == false) {
          madeChoice = true;
          $('#instructions').html('<h1>player' + playerNumber + ' chose ' + playerChoice + '</h1>');
          database.ref('/player' + playerNumber + '/choice').set(playerChoice);
      }
  });

  database.ref().on('value', function(snapshot) {
      if ((snapshot.child('/player1/choice').val() !== 'none') && (snapshot.child('/player2/choice').val() !== 'none')) {
          calChoices();
      }
  });



  //get and compair attack options
  function calChoices() {
      database.ref().once('value', function(snapshot) {
          //set var for choices
          switch (playerNumber) {
              case '1':
                  player = snapshot.child('/player1/choice').val().trim();
                  opponent = snapshot.child('/player2/choice').val().trim();
                  break;

              case '2':
                  player = snapshot.child('/player2/choice').val().trim();
                  opponent = snapshot.child('/player1/choice').val().trim();
                  break;
          }


      });
      //compair if playerOne chose rock
      if (player === 'rock' && opponent === 'scissor') {
          wins++;
          database.ref('/player1/choice').set('none');
          database.ref('/player2/choice').set('none');
          database.ref('/player' + playerNumber + '/wins').set(wins);
      }
      if (player === 'scissor' && opponent === 'paper') {
          wins++;
          database.ref('/player1/choice').set('none');
          database.ref('/player2/choice').set('none');
          database.ref('/player' + playerNumber + '/wins').set(wins);
      }
      if (player === 'paper' && opponent === 'rock') {
          wins++
          database.ref('/player1/choice').set('none');
          database.ref('/player2/choice').set('none');
          database.ref('/player' + playerNumber + '/wins').set(wins);
      }
      $('#instructions').html('<h1>Make a choice</h1>');
      madeChoice = false;
      //print score
      database.ref().on('value', function(snapshot) {

          $('#score').html('<h2>Player1:' + snapshot.child("/player1/wins").val() + ' Player2:' + snapshot.child("/player2/wins").val() + '</h2>');

      });

  }


  function addMessege() {
      playermessage = $('#enterMess').val();
      $('#chat').append('<p>' + playermessage + '</p>');
      $('#enterMess').val('');
  }
