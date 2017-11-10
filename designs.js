// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

//create constants and initialize them for colorPicker and sizePicker
const sizePicker = $('#sizePicker');
const colorPicker = $('#colorPicker');


// helper function that transforms hex colors to rbg colors for easiser conditions later on
function hexToRGB(hex){
  let red = parseInt(hex.slice(1,3), 16);
  let blue = parseInt(hex.slice(3,5), 16);
  let green = parseInt(hex.slice(5,7), 16);
  return 'rgb(' + red +', ' + blue + ', ' + green + ')';
}

function makeGrid() {

  let tableHeight, tableWidth, grid, table;

  //set the canvas table and get input values
  table = $('#pixel_canvas');
  tableHeight = $('#input_height').val();
  tableWidth = $('#input_width').val();

  //create the canvas table HTML and save it into grid
  for (let i = 0; i < tableHeight; i++ ){
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
sizePicker.submit(function(event){
  event.preventDefault();

  //create the canvas table
  makeGrid();

  //add a listener to all <td> elements in HTML
  $('td').click(function(event){

    //set the helper clickedCell, get the color from colorPicker and the current color from the clicked <td> and save it in a variable
    let clickedCell = event.target;
    let color = hexToRGB(colorPicker.val());
    let current_color = $(clickedCell).css('background-color');

    // check if we're trying to click on the <td> with the same color that's in it, if we are restore the background color and border color to basic
    if (current_color === color){
      $(clickedCell).css('background-color', '#ffffff');
      $(clickedCell).css('border','black solid 1px');
    }else {

      //set the background color of the <td> to color and the border to #dbfffe
      $(clickedCell).css('background-color', color);
      $(clickedCell).css('border','#dbfffe solid 1px');
    }
  });
});
