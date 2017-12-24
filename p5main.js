/****WRITTEN BY LUUK FRÖLING****
december 2017.
variable to store the network in -> n
variable to let the network train on the data multiple times for one click -> run
Array of arrays to store the data. for every spot in the data array, the first array is the
input data, and on the second spot is the desired output. -> data[][].
*/
var n;
var run = 1;
var data = [
  [
    [1,1,1,0,0,0], [1,0] //[input], [desired output];
  ],
  [
    [0,0,0,1,1,1], [0,1] //[input],[desired output];
  ]
]

function setup(){
  n = new neuralNet([6,6,2]);
  console.log(n);
}


function keyPressed(){
  for(var i = 0; i < run; i++){ //We use the run variable to loop through the data a couple of times. This can be changed from the console.
    for(var j = 0; j < data.length; j++){ //Make sure we loop trough all the data.
      n.train(data[j][0], data[j][1]); //Train 
    }
  }
  console.log(n.errorZ);
}
