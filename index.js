
//Function for the matrix
function gridMatrix(lengthX, lengthY) {
  var matrix = new Array(lengthX);
  for (var x = 0; x < lengthX; x++) {
    matrix[x] = new Array(lengthY);
    for (var y = 0; y < lengthY; y++) {
      matrix[x][y] = {
        state: 'empty'
      };
    }
  }
  return matrix;
}

//Function for random grid obstacles
function blockObstacles(grid, numberOfObstacles) {
  for (var index = 0, trys = 0; index < numberOfObstacles && trys < row * col; trys++) {
    var x = Math.floor(Math.random() * row);
    var y = Math.floor(Math.random() * col);
    if (grid[x][y].state != "block" &&
      !(x == startCoordinate[0] && y == startCoordinate[1]) &&
      !(x == endCoordinate[0] && y == endCoordinate[1])) {
      grid[x][y] = {
        state: 'block'
      };
      index++;
    }
  }
  return grid;
}

//Function to find the path between two cells
function findPath(grid) {
  var location = {
    x: startCoordinate[0],
    y: startCoordinate[1],
  };

  var queue = [];
  queue.push(location);
  while (queue.length) {
    var currentLocation = queue.shift();
    if (currentLocation == undefined)
      break;
    if (currentLocation.x == endCoordinate[0] && currentLocation.y == endCoordinate[1])
      return currentLocation;
    grid[currentLocation.x][currentLocation.y].state = 'visited';
    var neighbors = exploreLocation(currentLocation);
    for (neighbor of neighbors) {
      if (grid[neighbor.x][neighbor.y].state != "visited") {
        queue.push(neighbor);
        grid[neighbor.x][neighbor.y]["parent"] = currentLocation;
      }
    }
  }
  return {};
};

//Function to identify coordinates next to the current location and ways of movement
function exploreLocation(location) {
  var x = location.x;
  var y = location.y;
  var allNeighbors = [];

  if (safeCoordinate(x, y - 1)) allNeighbors.push({ x: x, y: y - 1 });
  if (safeCoordinate(x, y + 1)) allNeighbors.push({ x: x, y: y + 1 });
  if (safeCoordinate(x - 1, y)) allNeighbors.push({ x: x - 1, y: y });
  if (safeCoordinate(x + 1, y)) allNeighbors.push({ x: x + 1, y: y });

  return allNeighbors;
};

//Function to see if a coordinate is safe or not?
function safeCoordinate(x, y) {
  if (x < 0 || x >= row) return false;
  if (y < 0 || y >= col) return false;
  if (grid[x][y].state == 'block') return false;

  return true;
};

//Function to find and print the path from start to end coordinate
function printPath(path) {
  var paths = [];

  while (true) {
    var x = path.x;
    var y = path.y;
    if (x == undefined)
      break;
    var parent = grid[x][y].parent;
    if (parent == undefined)
      break;
    paths.unshift([x, y]);
    path = {
      x: parent.x,
      y: parent.y
    };
  }
  console.log(paths)
}

//Variables
var grid = gridMatrix(10, 10);

var startCoordinate = [0, 0];
var endCoordinate = [9, 9];
var numberOfBlocks = 20;

var row = grid.length;
var col = grid[0].length;

grid = blockObstacles(grid, numberOfBlocks);

var path = findPath(grid);
printPath(path);
