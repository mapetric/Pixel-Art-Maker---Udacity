// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
const sizePicker = $('#sizePicker');
const colorPicker = $('#colorPicker');
const canvas = $('#pixel_canvas');
const bucket = $('#fillBucket');
const erase = $('#erase');
const backgroundPicker = $('#backgroundPicker');
const backgroundColorPicker = $('#backgroundColorPicker');

let color, tableWidth, tableHeight, fillTableRow, fillTableCell, colorFill;
let isDrawing = false;
let fillBucket = false;
let erasePixel = false;
let backgroundColor;


// helper function that transforms hex colors to rbg colors for easiser conditions later on
function hexToRGB(hex) {
  let red = parseInt(hex.slice(1,3), 16);
  let blue = parseInt(hex.slice(3,5), 16);
  let green = parseInt(hex.slice(5,7), 16);
  return 'rgb(' + red +', ' + blue + ', ' + green + ')';
}

//added function for calculating whether the color is bright or dark, got the formula from 'https://www.w3.org/TR/AERT/#color-contrast'
function colorByBrightness(colorRBG) {
  let color = colorRBG.slice(4, -1);
  color = color.split(', ');
  let red = color[0];
  let blue = color[1];
  let green = color[2];
  return (red * 0.299 + green * 0.587 + blue * 0.114 < 125 ? '#ffffff' : '#000000');
}

function makeGrid() {
  let grid;

  //set the canvas table and get input values
  tableHeight = $('#input_height').val();
  tableWidth = $('#input_width').val();

  //create the canvas table HTML and save it into grid
  for (let i = 0; i < tableHeight; i++ ) {
    grid += '<tr>';
    for (let j = 0; j < tableWidth; j++) {
      grid += '<td></td>';
    }
    grid += '</tr>';
  }

  //fill the canvas table with HTML from grid
  canvas.html(grid);
}

function fill(tr, tc) {
  if ($(canvas[0].rows[tr].cells[tc]).css('background-color') === colorFill && color !== colorFill) {
    $(canvas[0].rows[tr].cells[tc]).css('background-color', color);
    if (tr!==0) {
      fill(tr-1, tc);
    }
    if (tr!==tableHeight-1){
      fill(tr+1, tc);
    }
    if (tc!==0) {
      fill(tr, tc-1);
    }
    if (tc!==tableWidth-1){
      fill(tr, tc+1);
    }
  }
}

sizePicker.submit(function(event){
  event.preventDefault();
  makeGrid();

  canvas.mousedown('td', function(event){
    event.preventDefault();
    if (fillBucket === false){
      color = erasePixel ? 'white' : colorPicker.val();
      isDrawing = true;
      $(event.target).css('background-color', color);
    }
  });

  canvas.mouseup(function(event){
    event.preventDefault();
    isDrawing = false;
  });

  $('#pixel_canvas td').mouseenter(function(event){
    if (isDrawing) {
      $(event.target).css("background-color", color);
    }
  });

  $('#pixel_canvas').mouseleave(function(event){
    isDrawing = false;
  });

  $('td').click(function(event){
    if (fillBucket) {
      event.preventDefault();
      fillTableRow = $(this).closest('tr').index();
      fillTableCell = this.cellIndex;
      colorFill = $(this).css('background-color');
      color = erasePixel ? 'rgb(255, 255, 255)' : colorPicker.val();
      fill(fillTableRow, fillTableCell);
    }
  });


});

bucket.click(function(event){
  fillBucket = !fillBucket;
  bucket.toggleClass('pressed');
});

erase.click(function(event){
  erasePixel = !erasePixel;
  erase.toggleClass('pressed');
});
