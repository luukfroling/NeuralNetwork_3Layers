class neuralNet {

  constructor(sizes){
    this.learnRate = 1;
    this.firstWeights = new Array(sizes[1]); //Create array with weights from input to hidden.
    this.p = new Array(sizes[1]);
    for(var i = 0; i < this.firstWeights.length; i++){
      this.firstWeights[i] = new Array(sizes[0]);
      this.p[i] = new Array(sizes[0]);
      this.firstWeights[i].fill(random()*2-1);
    }
    for(var i = 0; i < this.firstWeights.length; i++){ //Just some code to truly fill it with random numbers, however this is not necessary as i wrote this
      for(var j = 0; j < this.firstWeights[i].length; j++){ //to try and explain unusual behaviour, however it was just above my logic.
        this.firstWeights[i][j] = random()*2-1;
      }
    }
    this.secondWeights = new Array(sizes[2]); //Create array with weights from hidden to output.
    this.q = new Array(sizes[2]);
    for(var i = 0; i < this.secondWeights.length; i++){
      this.secondWeights[i] = new Array(sizes[1]);
      this.q[i] = new Array(sizes[1]);
      this.secondWeights[i].fill(random()*2-1);
    }
    this.x = new Array(sizes[0]); //Create x array with the size of the inputs.
    this.y = new Array(sizes[1]); //Create Y array with the size of the hidden layer.
    this.yb = new Array(sizes[1]); //Create for every y node a bias.
    this.yb.fill(0); // Fill all the biases with 1. Why? no clue. What do we know in life?
    this.z = new Array(sizes[2]); //Create X array with the outputs.
    this.zb = new Array(sizes[2]); // Biases for all the output nodes.
    this.zb.fill(0); //Same spiel
  }
  run(input){
    for(var i = 0; i < input.length; i++){  //Copy all the inputs into the x layer for clarity.
      this.x[i] = input[i]; //Copycopycopy
    }
    var sum = 0;
    for(var i = 0; i < this.y.length; i++){
      for(var j = 0; j < this.x.length; j++){
        this.p[i][j] = this.firstWeights[i][j] * this.x[j]
        sum += this.p[i][j];
      }
      this.y[i] = sigmoid(sum);
      sum = 0;
    }
    for(var i = 0; i < this.z.length; i++){
      for(var j = 0; j < this.y.length; j++){
        this.q[i][j] = this.secondWeights[i][j] * this.y[j];
        sum += this.q[i][j];
      }
      this.z[i] = sigmoid(sum);
      sum = 0;
    }
  }
  train(input, desired){
    this.run(input);
    this.errorZ = new Array(this.z.length);
    for(var i = 0; i < this.errorZ.length; i++){
      this.errorZ[i] = desired[i] - this.z[i];
    }
    this.adjustLastWeights();
    this.adjustFirstWeights();
    return this.errorZ;
  }
  mediumTrain(input, desired){
    this.run(input);
    this.errorZ = new Array(this.z.length);
    for(var i = 0; i < this.errorZ.length; i++){
      this.errorZ[i] = desired[i] - this.z[i];
    }
    return this.errorZ; //Return the errors for later computation with .push(). This can be handy for the average.
  }
  trainOnError(MediumError){ //So basically we train it the same only we give in certain errors.
    this.errorZ = MediumError;
    this.adjustLastWeights();
    this.adjustFirstWeights();
  }
  adjustLastWeights(){
    for(var i = 0; i < this.secondWeights.length; i++){
      for(var j = 0; j < this.secondWeights[i].length; j++){
        this.secondWeights[i][j] += this.errorZ[i] * this.y[j] * sigmoidD(this.z[i]) * this.learnRate;
      }
    }
  }
  adjustFirstWeights(){
    var sum = 0;
    var firstblock = 0;
    for(var i = 0; i < this.firstWeights.length; i++){ //Amount of hidden nodes
      for(var j = 0; j < this.firstWeights[i].length; j++){ //Amount of input nodes
        firstblock = this.x[j] * sigmoidD(this.y[i]); //Get the first block.
        for(var k = 0; k < this.z.length; k++){
          sum += firstblock * (this.errorZ[k] * sigmoidD(this.z[k]) * this.secondWeights[k][i]); //Rest of the functions.
        }
        this.firstWeights[i][j] += sum * this.learnRate; //Aaaannndd adjust.
        sum = 0; //Reset.
        firstblock = 0; //Reset.
      }
    }
  }
  fullRun(input){
    for(var i = 0; i < input.length; i++){  //Copy all the inputs into the x layer for clarity.
      this.x[i] = input[i]; //Copycopycopy
    }
    var sum = 0;
    for(var i = 0; i < this.y.length; i++){
      for(var j = 0; j < this.x.length; j++){
        this.p[i][j] = this.firstWeights[i][j] * this.x[j]
        sum += this.p[i][j];
      }
      sum += this.yb[i];
      this.y[i] = sigmoid(sum);
      sum = 0;
    }
    for(var i = 0; i < this.z.length; i++){
      for(var j = 0; j < this.y.length; j++){
        this.q[i][j] = this.secondWeights[i][j] * this.y[j];
        sum += this.q[i][j];
      }
      sum += this.zb[i];
      this.z[i] = sigmoid(sum);
      sum = 0;
    }
    this.printOutput();
  }
  printOutput(){
    var place = 0, value = 0;
    for(var i = 0; i < this.z.length; i++){
      if(this.z[i] > value){
        place = i;
        value = this.z[i];
      }
    }
    console.log(place, "is has the highest value with ", value);
  }
}
//All the functions used. Don't mind those, just 'simple' maths.
function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t)); // Go from any number to number from 0 to 1. sigmoid(0) = 0.5
}
function sigmoidD(t){
  return sigmoid(t) * (1-sigmoid(t)); //Sigmoid derivative
}
function rsigmoid(y){
  return log(y/(1-y)) //Reverse the sigmoid. Go from number between 0 and 1 to normal number.
}
