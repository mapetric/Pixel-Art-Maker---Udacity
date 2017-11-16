// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

//create constants and initialize them for colorPicker and sizePicker
const sizePicker = $('#sizePicker');
const colorPicker = $('#colorPicker');
const button = $('#button');
const colorPickerBackground = $('#colorPickerBackground');
const borderCollapse = $('#border_collapse');

let backgroundColor = 'rgb(255, 255, 255)';
let notSimple = false;


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
  let tableHeight, tableWidth, grid, table;

  //set the canvas table and get input values
  table = $('#pixel_canvas');
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
  table.html(grid);

}


//add a listener for submit button
sizePicker.submit(function(event) {
  event.preventDefault();

  //create the canvas table
  makeGrid();

  //add a listener for pick a background color button
  button.click(function(event){
    event.preventDefault;

    //get the colors from background and background color picker in rbg format
    backgroundColor = $('td').css('background-color');
    let pickedColor = hexToRGB(colorPickerBackground.val());

    //iterate trought every td element
    $('td').each(function(event) {
      event.preventDefault;

      //check if the background color is different from picked color and whether it is equal to the current background color
      //if it is different set the backgound color to pickedColor
      if($(this).css('background-color') !== pickedColor && $(this).css('background-color') === backgroundColor) {
        $(this).css('background-color', pickedColor);
        $(this).css('border', colorByBrightness(pickedColor) + ' solid 1px');
        $('#pixel_canvas').css('background-color', colorByBrightness(pickedColor));
      }
    });
  });

  //add a listener to all <td> elements in HTML
  $('td').click(function(event) {

    //set the helper clickedCell, get the color from colorPicker, colorPickerBackground and the current color from the clicked <td> and save it in a variable
    let clickedCell = event.target;
    backgroundColor = $('td').css('background-color');
    let color = hexToRGB(colorPicker.val());
    let current_color = $(clickedCell).css('background-color');

    // check if we're trying to click on the <td> with the same color that's in it, if we are restore the background color and border color to background colors
    // otherwise  set the background color of the <td> and the borders
    if (current_color === color){
      $(clickedCell).css('background-color', backgroundColor);

      //set the border color to according to brightness
      if (notSimple) {
          $(clickedCell).css('border', colorByBrightness(backgroundColor) + ' solid 1px');
      }
    } else {
      $(clickedCell).css('background-color', color);

      //set the border color to according to brightness
      if (notSimple) {
        $(clickedCell).css('border', colorByBrightness(color) + ' solid 1px');
      }
    }
  });
});

borderCollapse.change(function(){
  let change = $("#border_collapse option:selected").text()
  notSimple = change === 'separate' ? true : false;
  $('table').attr({'style': 'border-collapse:' + change });
  $('td').css('border', colorByBrightness(backgroundColor) + ' solid 1px');
  if (notSimple) {
    $('td').each(function(event){
      if ($(this).css('background-color') !== backgroundColor){
        $(this).css('border', colorByBrightness($(this).css('background-color')) + ' solid 1px');
      }
    });
  }
});
