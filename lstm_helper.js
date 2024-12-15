/**
 * To build a vocabulary from text data
 * @param data
 * @returns {{}}
 */
function buildVocabulary(data) {
    const vocab = {};
    let index = 1; // Starting index (0 is reserved for padding)

    // Loop over all the words in the dataset and assign an index
    data.forEach(item => {
        item.message.split(' ').forEach(word => {
            if (!vocab[word]) {
                vocab[word] = index++;
            }
        });
    });

    return vocab;
}

/**
 * return a token of the text
 * @param text
 * @param vocab
 * @returns {*}
 */
function tokenize(text, vocab) {
    return text.split(' ').map(word => vocab[word] || 0);
}


/**
 * Padding is last step before building a layer in the model
 * @param sequence
 * @param maxLength
 * @returns {*[]}
 */
function padSequence(sequence, maxLength) {
    const padding = Array(Math.max(0, maxLength - sequence.length)).fill(0);
    return [...sequence, ...padding].slice(0, maxLength); // Ensure the sequence is exactly maxLength
}


module.exports = {buildVocabulary, tokenize, padSequence};