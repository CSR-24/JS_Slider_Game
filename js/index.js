var moves = 0;
function startListners(){
  $('.box').on('click', checkRule);
  $('#shuffle').on('click', shuffleBoard);
}

function refreshGrid(target, text){
  $(target).text(text);
}

function shuffleBoard(){
  var newBoardPattern = _.shuffle(['1', '2' , '3', '4', '5', '6', '7', '8', '-']);
  $('.box').each(function(){
    var id = '#'+this.id;
    if ($(id).text() === '-'){
      $(id).css('background-color', 'steelBlue');
    }
  });
  $('#s1').text(newBoardPattern[0]);
  $('#s2').text(newBoardPattern[1]);
  $('#s3').text(newBoardPattern[2]);
  $('#s4').text(newBoardPattern[3]);
  $('#s5').text(newBoardPattern[4]);
  $('#s6').text(newBoardPattern[5]);
  $('#s7').text(newBoardPattern[6]);
  $('#s8').text(newBoardPattern[7]);
  $('#s9').text(newBoardPattern[8]);
  $('.box').each(function(){
    var id = '#'+this.id;
    if ($(id).text() === '-'){
      $(id).css('background-color', 'lightblue');
    }
  });
}

function checkGoal() {
   if ($('#s1').text() === '1' && 
       $('#s2').text() === '2' && 
       $('#s3').text() === '3' && 
       $('#s4').text() === '4' && 
       $('#s5').text() === '5' && 
       $('#s6').text() === '6' && 
       $('#s7').text() === '7' &&
       $('#s8').text() === '8' && 
       $('#s9').text() === '-'){
     return true;
   } else {
     return false;
   }
}

function checkRule(){
  var sourceId = '#'+this.id;
  var sourceText =  $(sourceId).text();
  var targetText = '-';
  $('.box').each(function(){
    var id = '#'+this.id;
    if ($(id).text() === '-'){
      if (ruleEngine(sourceId, id)){
        refreshGrid(id, sourceText);
        $(id).css('background-color', 'steelBlue');
        refreshGrid(sourceId, targetText);
        $(sourceId).css('background-color', 'lightblue');
        updateMessage('Vaid Move. Tile: '+sourceText+' moved.' , 'darkBlue');
        if (checkGoal()){
          updateMessage('You Won.. Puzzle Solved!', 'green');
          $('.box').off('click');
        }
        $('#movesInc').text('Number Of Moves : '+moves++);
      } else {
        updateMessage('Invaid Move! Click on a vaid tile.', 'Red');
      }
      return false;
    } 
  });
}

function ruleEngine(sourceId, targetId){
  switch(targetId){
    case '#s9':
      if (sourceId === '#s8' || sourceId === '#s6'){
        return true;
      } else {
        return false;
      }
    case '#s8':
      if (sourceId === '#s7' || sourceId === '#s9' || sourceId === '#s5'){
        return true;
      } else {
        return false;
      }
    case '#s7':
      if (sourceId === '#s8' || sourceId === '#s4'){
        return true;
      } else {
        return false;
      }
    case '#s6':
      if (sourceId === '#s3' || sourceId === '#s5' || sourceId === '#s9'){
        return true;
      } else {
        return false;
      }
    case '#s5':
      if (sourceId === '#s2' || sourceId === '#s4' || sourceId === '#s8' || sourceId === '#s6'){
        return true;
      } else {
        return false;
      }
    case '#s4':
      if (sourceId === '#s1' || sourceId === '#s7' || sourceId === '#s5'){
        return true;
      } else {
        return false;
      }
    case '#s3':
      if (sourceId === '#s2' || sourceId === '#s6'){
        return true;
      } else {
        return false;
      }
    case '#s2':
      if (sourceId === '#s1' || sourceId === '#s3' || sourceId === '#s5'){
        return true;
      } else {
        return false;
      }
    case '#s1':
      if (sourceId === '#s2' || sourceId === '#s4'){
        return true;
      } else {
        return false;
      }
  }
}

function startGame(){
  startListners();
  shuffleBoard();
}

function updateMessage(msg, color){
  $('#msg').text(msg);
  $('#msg').css('color', color);  
}

startGame();