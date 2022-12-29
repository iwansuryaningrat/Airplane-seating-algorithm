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

  // Check input data for validity
  isInputValid: function (arrayRowsColumns, que) {
    // Check input data rows and columns for validity
    if (arrayRowsColumns.length > 8) {
      alert("Too many sections with the rows and columns!");
      document.getElementById("rowsColumns").focus();
      return false;
    }

    // Check input data number of array for validity
    for (i = 0; i < arrayRowsColumns.length; i++) {
      for (j = 0; j < arrayRowsColumns[i].length; j++) {
        if (
          arrayRowsColumns[i][j] < 1 ||
          Number.isNaN(arrayRowsColumns[i][j])
        ) {
          alert("The rows and columns must be more than 0!");
          document.getElementById("rowsColumns").focus();
          return false;
        }
      }
    }

    // Check input data number of queue for validity
    if (que < 1 || que % 1 != 0) {
      alert("Incorrect input!");
      document.getElementById("queue").focus();
      return false;
    }
  },

  // Sort seats
  sortSeat: function (inputArray, resultArr) {
    for (block = 1; block <= inputArray.length; block++) {
      for (column = 1; column <= inputArray[block - 1][0]; column++) {
        for (row = 1; row <= inputArray[block - 1][1]; row++) {
          if (block === 1 && column === 1 && inputArray[block - 1][0] > 1) {
            newSeat = new Seat(block, column, row, 2);
            resultArr.push(newSeat);
          } else if (
            block === inputArray.length &&
            column === inputArray[block - 1][0] &&
            inputArray[block - 1][0] > 1
          ) {
            newSeat = new Seat(block, column, row, 2);
            resultArr.push(newSeat);
          } else if (column === 1 || column === inputArray[block - 1][0]) {
            newSeat = new Seat(block, column, row, 1);
            resultArr.push(newSeat);
          } else {
            newSeat = new Seat(block, column, row, 3);
            resultArr.push(newSeat);
          }
        }
      }
    }
  },
};
