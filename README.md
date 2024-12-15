# Identity attack detection with LSTM and tensorflow.js

This project is a simple LSTM AI model implemented by tensorflow.js 
to detect identity attack and phishing attacks with messages by email and SMS


### AI Architecture 

**LSTM Architecture**
Long short term memory model is using attention mechanism for advance text aware networks, but we are going to do simple Text classification with LSTM

**Steps of our AI architecture**
- Cleaning text messages 
- Create vocabulary dictionary where each word is mapped to a number
- We create a padding sequence of how words are matched together
- Building Ai model 
  - Applying Embedding layer from padding layer 
  - Applying LSTM layer to the Embedding layer with attention mechanism
  - Apply dense layer to LSTM to map LSTM layer to 1/0 using sigmoid activation function
- Compiling the model and evaluating the model with our test data

### Running the script


```
  npm install
  node train_simple_data.js
  node train_spam_ds.js
```