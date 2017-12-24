# NeuralNetwork_3Layers
3 Layer neural network, using backpropagation to learn.
Some documentation:
- Create a network with new neuralNet(sizes), whereing sizes is an array with a length of 3 containing the sizes of the layers.
- Every neuralNet has an errorZ propperty, which is the desired - output. 
- You can call .fullRun(input) to only give the inputs and log the output. The output is also saved to .z
- The network does not take in an array of data, so you need to loop through thay yourself. 
- When we call .train(input, desired), backpropagation is used automatically. 
- Remember if you show the network in the console, the results of the last training sample are stored in there. 

This repo includes the 'library' file, and a simple example file. The example uses keyPressed which comes from the p5.js library. The libraries for the p5.js stuff is linked in the html file. If you want to use it you can probably just copy it. 
