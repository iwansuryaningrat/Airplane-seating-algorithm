function Seat(block, row, column, classSeat, passenger) {
  this.block = block;
  this.row = row;
  this.column = column;
  this.classSeat = classSeat;
  this.passenger = passenger;
}

var controller = {
  // Initialization
  init: function () {
    let seats = document.getElementById("seats");
    let row, column, block, newSeat, i, j, z;
    let table, tr, td;
    let result = [];

    document.getElementById("button").addEventListener("click", function () {
      let queue = document.getElementById("queue").value;
      let stringRowsColumns = document.getElementById("rowsColumns").value;
      let inputArrayRowsColumns = controller.parseInput(stringRowsColumns);
      result = [];

      view.clearFromDOM(seats); // removing old result

      if (controller.isInputValid(inputArrayRowsColumns, queue) === false) {
        return false;
      }

      view.addBackgroundImg();
      controller.sortSeat(inputArrayRowsColumns, result);
      result.sort(controller.comparator("column"));
      result.sort(controller.comparator("classSeat"));

      controller.seatPassengers(result, queue);
      result.sort(controller.comparator("row", "column", "block"));
      view.createTableResults(inputArrayRowsColumns, result);
    });
  },

  //get a string from input in the format '[[x,y],[x,y]]' and return an array [[x,y],[x,y]]
  parseInput: function (string) {
    string = string.replace(/\s/g, ""); //remove extra spaces
    string = string.substring(2, string.length - 2); //remove first and last 2 symbol

    let array = string.split("],[").map(function (x) {
      //transform string to array
      return x.split(",");
    });

    for (i = 0; i < array.length; i++) {
      //replace strings to numbers
      for (j = 0; j < array[i].length; j++) {
        array[i][j] = parseInt(array[i][j]);
      }
    }
    return array;
  },

  // Comparator for sorting
  comparator: function (key) {
    return function (a, b) {
      return a[key] - b[key];
    };
  },
};
