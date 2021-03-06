const FROG = {
  green: {
    color: 'green',
    img: 'imgs/frogGreen.png'
  },
  red: {
    color: 'red',
    img: 'imgs/frogRed.png'
  }
};

const BLANK_SPACE = "blank";
let START_ARRAY = [];
let FINAL_ARRAY = [];

let posArray = [];
let prevArray = [];
let counter = 0;

setFrogNum($('#frogNumberSelector').children('option:selected').val());

function setFrogNum(num) {
  let columns = Number((num * 2) + 1);
  $('.frog').remove();
  counter = 0;
  buildArrays(num);
  prevArray = [];
  posArray = [];
  prevArray.push(START_ARRAY.slice());
  posArray = START_ARRAY.slice();
  buildFrogs();
  $('.frogGrid').css('grid-template-columns', 'repeat(' + columns + ', 1fr)');
  displayFrogs();
}

function buildArrays(num) {
  START_ARRAY = [BLANK_SPACE];
  FINAL_ARRAY = [BLANK_SPACE];
  for (let i = 0; i < num; i++) {
    START_ARRAY.unshift(FROG.red.color);
    START_ARRAY.push(FROG.green.color);
    FINAL_ARRAY.unshift(FROG.green.color);
    FINAL_ARRAY.push(FROG.red.color);
  }
}

function buildFrogs() {
  let list = document.getElementById('frogList');
  for (let i = 0; i < START_ARRAY.length; i++) {
    let listItem = document.createElement('li');
    listItem.setAttribute('id', 'pos' + i);
    listItem.setAttribute('class', 'frog');
    document.getElementById('frogList').appendChild(listItem);

  }
}

function displayFrogs() {
  $('#counter').html(counter);
  for (let i = 0; i < posArray.length; i++) {
    if (posArray[i] == FROG.red.color) {
      $('#pos' + i).html('<img class="clickable" src="' + FROG.red.img + '" alt="red frog" >');
    } else if (posArray[i] == FROG.green.color) {
      $('#pos' + i).html('<img class="clickable" src="' + FROG.green.img + '" alt="green frog" >');
    } else {
      $('#pos' + i).html('<img src="imgs/blankSpace.png" alt="" >');
    }
  }
}

function makeMove(index) {
  if (!compareArrays(prevArray[prevArray.length - 1], posArray))
    prevArray.push(posArray.slice());
  switch (posArray[index]) {
    case FROG.red.color:
      if (posArray[index + 1] == BLANK_SPACE) {
        posArray[index + 1] = FROG.red.color;
        posArray[index] = BLANK_SPACE;
        counter++;
      } else if (posArray[index + 2] == BLANK_SPACE) {
        posArray[index + 2] = FROG.red.color;
        posArray[index] = BLANK_SPACE;
        counter++;
      }
      break;
    case FROG.green.color:
      if (posArray[index - 1] == BLANK_SPACE) {
        posArray[index - 1] = FROG.green.color;
        posArray[index] = BLANK_SPACE;
        counter++;
      } else if (posArray[index - 2] == BLANK_SPACE) {
        posArray[index - 2] = FROG.green.color;
        posArray[index] = BLANK_SPACE;
        counter++;
      }
      break;
  };
  displayFrogs();
  if (compareArrays(posArray, FINAL_ARRAY)) {
    alert('Congratulations, you did it!');
  }
}

function resetFrogs() {
  posArray = START_ARRAY.slice();
  prevArray = [];
  prevArray.push(START_ARRAY.slice());
  counter = 0;
  displayFrogs();
}

function compareArrays(x, y) {
  if (x.length != y.length)
    return false;
  for (var i = 0; i < x.length; i++) {
    if (x[i] != y[i])
      return false;
  }
  return true;
}

function undo() {
  if (prevArray[prevArray.length - 1] != null) {
    if (compareArrays(prevArray[prevArray.length - 1], posArray) && prevArray.length > 1) {
      prevArray.pop();
    }
    posArray = prevArray[prevArray.length - 1].slice();
    if (prevArray.length > 1) {
      prevArray.pop();
    }
  }
  if (!compareArrays(prevArray, posArray) && counter > 0)
    counter--;
  displayFrogs();
}

$('#frogNumberSelector').change(function() {
  setFrogNum($(this).children('option:selected').val());
});

$(document).on('click', '.frog', function() {
  let pos = $(this).index();
  // - 3 since the index of the list already has 3 elements for the buttons
  makeMove(pos - 3);
});
