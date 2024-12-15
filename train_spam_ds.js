//Handling csv spam file
const lstm_helper = require('./lstm_helper');
const spamData = require('./spam.json');


//Load both tensorflow and toxicity model
const tf = require('@tensorflow/tfjs');
const ts_helper = require("./ts_helper");

//Load our data
const vocab = lstm_helper.buildVocabulary(spamData);

// Tokenize and pad text data
// Maximum length of each sequence we make it to 10
const maxLength = 10;

const tokenizedTexts = spamData.map(item => lstm_helper.padSequence(lstm_helper.tokenize(item.message.toLowerCase(), vocab), maxLength));
const labels = spamData.map(item => item.output.toUpperCase() === "SPAM" ? 1 : 0);


// convert both to ts tensors
const inputTensor = tf.tensor(tokenizedTexts);
const labelTensor = tf.tensor(labels);


// Create the english simple model with vocab size length + 1
const model = ts_helper.createLSTMModel(Object.keys(vocab).length + 1);
// Train the simple english model
ts_helper.trainModel(model, inputTensor, labelTensor, "EN_SPAM").then(() => {
    // Evaluate the model
    ts_helper.evaluateModel(model, inputTensor, labelTensor, "EN_SIMPLE").then(() => {
        // Make predictions of simple data and print probability of Bluff Or Not
        ts_helper.makePrediction(model, "Your account is closed", "EN_SIMPLE",vocab,maxLength).catch(console.error);
        ts_helper.makePrediction(model, "Welcome to AI", "EN_SIMPLE",vocab,maxLength).catch(console.error);
    });
}).catch(console.error);




