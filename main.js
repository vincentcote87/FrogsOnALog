const FROG = {
  green: 'green',
  red: 'red'
};

const BLANK_SPACE = "blank";

let posArray = [FROG.red, FROG.red, FROG.red, BLANK_SPACE, FROG.green, FROG.green, FROG.green];

$('.frog').click(function () {
  let pos = $(this).index();
  makeMove(pos);
});

function displayFrogs() {
  for (let i = 0; i < posArray.length; i++) {
    $('#pos' + i).html(posArray[i]);
  }
}

function makeMove(index) {
  switch (posArray[index]) {
    case FROG.red:
      if (posArray[index + 1] == BLANK_SPACE) {
        posArray[index + 1] = FROG.red;
        posArray[index] = BLANK_SPACE;
      } else if (posArray[index + 2] == BLANK_SPACE) {
        posArray[index + 2] = FROG.red;
        posArray[index] = BLANK_SPACE;
      }
      break;
    case FROG.green:
      if (posArray[index - 1] == BLANK_SPACE) {
        posArray[index - 1] = FROG.green;
        posArray[index] = BLANK_SPACE;
      } else if (posArray[index - 2] == BLANK_SPACE) {
        posArray[index - 2] = FROG.green;
        posArray[index] = BLANK_SPACE;
      }
      break;
  };
  displayFrogs();
}