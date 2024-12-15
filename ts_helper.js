const lstm_helper = require("./lstm_helper");
const tf = require("@tensorflow/tfjs");


/**
 * Create LSTM AI model
 * @param vocabSize size of vocabulary used in model
 * @param embeddingDim the dimension of the embedding layer we have default of 16
 * @param inputLength the input length we use 10 as input length
 * @returns {Sequential} model
 */
function createLSTMModel(vocabSize, embeddingDim = 16, inputLength = 10) {
    const model = tf.sequential();

    // Embedding layer
    model.add(tf.layers.embedding({inputDim: vocabSize, outputDim: embeddingDim, inputLength: inputLength}));

    // LSTM layer
    model.add(tf.layers.lstm({units: 32, returnSequences: false}));

    // Dense layer
    model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

    //Compile the model with adam algorith optimizer and binary Cross entropy loss function
    model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    return model;
}


/**
 * Evaluate the LSTM model with the labels
 * @param model AI model
 * @param inputs inputs to use for evaluation
 * @param labels outputs to evaluate the model against
 * @param modelType
 * @returns {Promise<void>}
 */
async function evaluateModel(model, inputs, labels, modelType) {
    const result = await model.evaluate(inputs, labels);
    console.log(`Evaluation for model ${modelType}, results: ${result}`);
}


/**
 * Train the Tensorflow model and
 * @param model
 * @param inputs
 * @param labels
 * @param modelType
 * @returns {Promise<void>}
 */
async function trainModel(model, inputs, labels, modelType) {
    await model.fit(inputs, labels, {
        epochs: 10,
        validationSplit: 0.4,
        callbacks: {
            onTrainBegin: (logs) => {
                console.log(`${modelType} training began`);
            },
            onEpochBegin: (epoch, logs) => {
                console.log(`${modelType} => Epoch ${epoch + 1} started`);
            },
            onEpochEnd: (epoch, logs) => {
                console.log(`${modelType} => Epoch ${epoch + 1}: Loss : ${logs.loss}`);
            }
        }
    });
    console.log("Model training complete!");

}


/**
 * Make a prediction using the model and a given text to check if it is positive or not
 * @param model the given model
 * @param text the text to predict
 * @param modelType
 * @param vocab
 * @param maxLength
 * @returns {Promise<void>}
 */
async function makePrediction(model, text, modelType, vocab, maxLength) {
    const tokenizedInput = lstm_helper.padSequence(lstm_helper.tokenize(text, vocab), maxLength);
    const inputTensor = tf.tensor([tokenizedInput]);

    const prediction = model.predict(inputTensor);
    console.log(`Prediction of ${text} is done according to ${modelType} model`);
    prediction.print();
}


module.exports = {createLSTMModel, evaluateModel, trainModel, makePrediction};