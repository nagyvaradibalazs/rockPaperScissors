# -*- coding: utf-8 -*-
"""rock_paper_scissors_model

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1XD0uJrhADV9JkrzQLtRSbP5PJm4Rs5CU

credits:

@ONLINE {rps,
author = "Laurence Moroney",
title = "Rock, Paper, Scissors Dataset",
month = "feb",
year = "2019",
url = "http://laurencemoroney.com/rock-paper-scissors-dataset"
}
"""

#Google Colab session for training the model

#manually install tensorflowjs
!pip install tensorflowjs

#import libraries
import numpy as np
import tensorflow as tf
import tensorflow_datasets as tfds
import tensorflowjs as tfjs
from tensorflow import keras

#import data from tensorflow dataset
data_train, data_test = tfds.load('rock_paper_scissors', split=['train', 'test'])

#preprocess train and test data
img_train = np.array([img['image'].numpy()[:,:,1] for img in data_train])
label_train = np.array([label['label'].numpy() for label in data_train])

img_test = np.array([img['image'].numpy()[:,:,1] for img in data_test])
label_test = np.array([label['label'].numpy() for label in data_test])

img_train = img_train.reshape([2520, 300, 300, 1])
img_train = img_train / 255.0

img_test = img_test.reshape([372, 300, 300, 1])
img_test = img_test / 255.0

#create the model
model = keras.Sequential([
  keras.layers.AveragePooling2D(6, 6, input_shape=(300, 300, 1)),
  keras.layers.Conv2D(128, 4, activation='relu'),
  keras.layers.Conv2D(64, 4, activation='relu'),
  keras.layers.Conv2D(32, 4, activation='relu'),
  keras.layers.MaxPool2D(2, 2),
  keras.layers.Dropout(0.5),
  keras.layers.Flatten(),
  keras.layers.Dense(64, activation='relu'),
  keras.layers.Dropout(0.2),
  keras.layers.Dense(3, activation='softmax')               
])

#define compile methods
model.compile(optimizer='adam', loss=keras.losses.sparse_categorical_crossentropy, metrics=['accuracy'])

#train the model
model.fit(img_train, label_train, epochs=8)

#test the model
loss, acc = model.evaluate(img_test, label_test)

#save tfjs model
tfjs.converters.save_keras_model(model, 'rock_paper_scissors_model')