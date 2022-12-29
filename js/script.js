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
};
