import * as predictionHandler from "./prediction.js";
import * as videoHandler from "./video.js";
import * as gameHandler from "./game.js";

var captureButton = null;
var canvas = null;
var model = undefined;
var playerMove = null;
var scores = null;

const play = async () => {
    //draw on canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(videoHandler.capture(), 380, 50, 240, 240,  0, 0, 300, 150);

    var data = canvas.toDataURL('image/png');
    var imageData = ctx.getImageData(0, 0, 150, 150);

    //getting prediction
    var tensor = tf.tensor(videoHandler.preProcessImage(imageData.data));
    var results = await predictionHandler.runRecognizer(tensor, model);

    playerMove.innerHTML = (results[0] > results[1] && results[0] > results[2]) ? 'Rock' : (results[1] > results[0] && results[1] > results[2]) ? 'Paper' : 'Scissors';

    //update scores
    let winner = gameHandler.play(results);
    scores[winner].innerHTML = Number(scores[winner].innerHTML) + 1;
}

window.onload = async function() {
    //load trained model
    model = await tf.loadLayersModel("model/model.json");
    
    videoHandler.setup();

    captureButton = document.getElementById('capture-button');
    canvas = document.getElementById('canvas');
    playerMove = document.getElementById('class');
    scores = [document.getElementById('won'), document.getElementById('tied'), document.getElementById('lost'),];

    captureButton.addEventListener('click', play);
}