### First test output with 12 elements of test data
``` 
Evaluation result: [ Tensor {
    kept: false,
    isDisposedInternal: false,
    shape: [],
    dtype: 'float32',
    size: 1,
    strides: [],
    dataId: { id: 96727 },
    id: 121140,
    rankType: '0',
    scopeId: 111381 },
  Tensor {
    kept: false,
    isDisposedInternal: false,
    shape: [],
    dtype: 'float32',
    size: 1,
    strides: [],
    dataId: { id: 96729 },
    id: 121142,
    rankType: '0',
    scopeId: 111381 } ]
```

## Second trial 
Test with both SE and english simple 16 messages

```
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================
Building model with english simple data
Orthogonal initializer is being called on a matrix with more than 2000 (4096) elements: Slowness may result.
Orthogonal initializer is being called on a matrix with more than 2000 (4096) elements: Slowness may result.
EN_SIMPLE => Epoch 1: Loss : 0.6927931308746338
SV_SIMPLE => Epoch 1: Loss : 0.6927521228790283
EN_SIMPLE => Epoch 2: Loss : 0.6895828247070312
SV_SIMPLE => Epoch 2: Loss : 0.689328670501709
EN_SIMPLE => Epoch 3: Loss : 0.6875264644622803
SV_SIMPLE => Epoch 3: Loss : 0.6872789263725281
EN_SIMPLE => Epoch 4: Loss : 0.6824260950088501
SV_SIMPLE => Epoch 4: Loss : 0.6845638751983643
EN_SIMPLE => Epoch 5: Loss : 0.6776889562606812
SV_SIMPLE => Epoch 5: Loss : 0.6810259222984314
EN_SIMPLE => Epoch 6: Loss : 0.6725651621818542
SV_SIMPLE => Epoch 6: Loss : 0.6759723424911499
EN_SIMPLE => Epoch 7: Loss : 0.6639953851699829
SV_SIMPLE => Epoch 7: Loss : 0.6714534163475037
EN_SIMPLE => Epoch 8: Loss : 0.6505866646766663
SV_SIMPLE => Epoch 8: Loss : 0.6612645387649536
EN_SIMPLE => Epoch 9: Loss : 0.6244547367095947
SV_SIMPLE => Epoch 9: Loss : 0.6442015171051025
EN_SIMPLE => Epoch 10: Loss : 0.5942727327346802
SV_SIMPLE => Epoch 10: Loss : 0.617788553237915
Model training complete!
Model training complete!
Evaluation for model EN_SIMPLE, results: Tensor
    0.585605800151825,Tensor
    0.625
Evaluation for model SV_SIMPLE, results: Tensor
    0.6037846803665161,Tensor
    0.6875
Prediction of Your account is closed is done according to EN_SIMPLE model
Tensor
     [[0.6087983],]
Prediction of Welcome to AI is done according to EN_SIMPLE model
Tensor
     [[0.5808521],]
Prediction of Problem logga in is done according to SV_SIMPLE model
Tensor
     [[0.5905287],]
Prediction of Hej hur mår du ?  is done according to SV_SIMPLE model
Tensor
     [[0.5691299],]
```

**The model was giving similar results for both positive and not positive messages**

## Testing with spam dataset from kaggle

```
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================
Orthogonal initializer is being called on a matrix with more than 2000 (4096) elements: Slowness may result.
EN_SPAM training began
EN_SPAM => Epoch 1 started
EN_SPAM => Epoch 1: Loss : 0.6123257279396057
EN_SPAM => Epoch 2 started
EN_SPAM => Epoch 2: Loss : 0.3126852810382843
EN_SPAM => Epoch 3 started
EN_SPAM => Epoch 3: Loss : 0.18448084592819214
EN_SPAM => Epoch 4 started
EN_SPAM => Epoch 4: Loss : 0.12555763125419617
EN_SPAM => Epoch 5 started
EN_SPAM => Epoch 5: Loss : 0.09162206202745438
EN_SPAM => Epoch 6 started
EN_SPAM => Epoch 6: Loss : 0.06843119859695435
EN_SPAM => Epoch 7 started
EN_SPAM => Epoch 7: Loss : 0.05018474534153938
EN_SPAM => Epoch 8 started
EN_SPAM => Epoch 8: Loss : 0.03572377935051918
EN_SPAM => Epoch 9 started
EN_SPAM => Epoch 9: Loss : 0.022890282794833183
EN_SPAM => Epoch 10 started
EN_SPAM => Epoch 10: Loss : 0.014443684369325638
Model training complete!
Evaluation for model EN_SIMPLE, results: Tensor
    0.10902348160743713,Tensor
    0.9652067422866821
Prediction of Your account is closed is done according to EN_SIMPLE model
Tensor
     [[0.7473351],]
Prediction of Welcome to AI is done according to EN_SIMPLE model
Tensor
     [[0.2986287],]
```