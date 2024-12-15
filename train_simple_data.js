/**
 * Identity attack detection with tensorflow.js and simple text classification model
 */

//Load both tensorflow and toxicity model
const tf = require('@tensorflow/tfjs');

const lstm_helper = require('./lstm_helper');
const ts_helper = require('./ts_helper');

//Load our data
const data = require('./data.json');
const sv_data = require('./data_sv.json');

const vocab = lstm_helper.buildVocabulary(data);
const sv_vocab = lstm_helper.buildVocabulary(sv_data);

// Tokenize and pad text data
// Maximum length of each sequence we make it to 10
const maxLength = 10;

const tokenizedTexts = data.map(item => lstm_helper.padSequence(lstm_helper.tokenize(item.message.toLowerCase(), vocab), maxLength));
const tokenizedSVTexts = sv_data.map(item => lstm_helper.padSequence(lstm_helper.tokenize(item.message.toLowerCase(), sv_vocab), maxLength));

const labels = data.map(item => item.output.toUpperCase() === "BLUFF" ? 1 : 0);
const sv_labels = sv_data.map(item => item.output.toUpperCase() === "BLUFF" ? 1 : 0);


// convert both to ts tensors
const inputTensor = tf.tensor(tokenizedTexts);
const labelTensor = tf.tensor(labels);

const inputSvTensor = tf.tensor(tokenizedSVTexts);
const labelsSvTensor = tf.tensor(sv_labels);


// Create the english simple model with vocab size length + 1
const model = ts_helper.createLSTMModel(Object.keys(vocab).length + 1);
const sv_model = ts_helper.createLSTMModel(Object.keys(sv_vocab).length + 1)


// Train the simple english model
ts_helper.trainModel(model, inputTensor, labelTensor, "EN_SIMPLE").then(() => {
    // Evaluate the model
    ts_helper.evaluateModel(model, inputTensor, labelTensor, "EN_SIMPLE").then(() => {
        // Make predictions of simple data and print probability of Bluff Or Not
        ts_helper.makePrediction(model, "Your account is closed", "EN_SIMPLE", vocab, maxLength).catch(console.error);
        ts_helper.makePrediction(model, "Welcome to AI", "EN_SIMPLE", vocab, maxLength).catch(console.error);
    });
}).catch(console.error);


ts_helper.trainModel(sv_model, inputSvTensor, labelsSvTensor, "SV_SIMPLE").then(() => {
    // Evaluate the model
    ts_helper.evaluateModel(sv_model, inputSvTensor, labelsSvTensor, "SV_SIMPLE").then(() => {
        // Make predictions of simple data and print probability of Bluff Or Not
        ts_helper.makePrediction(model, "Problem logga in", "SV_SIMPLE", sv_vocab, maxLength).catch(console.error);
        ts_helper.makePrediction(model, "Hej hur mår du ? ", "SV_SIMPLE", sv_vocab, maxLength).catch(console.error);
    });
}).catch(console.error);

