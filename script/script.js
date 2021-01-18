import * as predictionHandler from "./prediction.js";

var width = 320;
var height = null;
var videoIsOn = false;
var video = null;
var photo = null;
var captureButton = null;
var canvas = null;
var model = undefined;
var move = null;

const setup = () => {
    video = document.getElementById('video');
    photo = document.getElementById('photo');
    captureButton = document.getElementById('capture-button');
    canvas = document.getElementById('canvas');
    move = document.getElementById('class');

    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function(obj) {video.srcObject = obj; video.play()});

    captureButton.addEventListener('click', capture);    
}

const capture = async () => {
    var ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, 300, 150);
    var data = canvas.toDataURL('image/png');
    var imageData = ctx.getImageData(0, 0, 300, 300);
    photo.setAttribute('src', data);

    var tensor = tf.tensor(preProcessImage(imageData.data));

    var results = await predictionHandler.runRecognizer(tensor, model);

    if(results[0] > results[1] && results[0] > results[2]) {
        move.innerHTML = 'rock';
    }
    else if(results[1] > results[0] && results[1] > results[2]) {
        move.innerHTML = 'paper';
    }
    else {
        move.innerHTML = 'scissors';
    }
}

const preProcessImage = (imageData) => {
    var result = [];
    var temp = [];
    var count = 0;
    for(let i = 0; i < 360000; i++) {
        if(i % 4 == 2) {
            temp.push([imageData[i] / 255.0]);
            count++;
        }
        if(count == 300) {
            result.push(temp);
            temp = [];
            count = 0;
        }
    }

    return [result];
}

window.onload = async function() {
    //load trained model
    model = await tf.loadLayersModel("model/model.json");
    
    setup();
}