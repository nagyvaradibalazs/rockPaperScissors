var video = null;
var bg = null;

const setup = () => {
    video = document.getElementById('video');

    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function(obj) {video.srcObject = obj; video.play()});   
}

const capture = () => {
    return video;
}

const calibrate = (imageData) => {
    bg = imageData.data;
}

const similar = (imageData, i) => {
    if(Math.abs(imageData[i + 1] - bg[i + 1]) < 20)
        return true;

    return false;
}

const preProcessImage = (imageData) => {
    var result = [];
    var temp = [];
    var count = 0;
    for(let i = 0; i < 90000; i += 4) {
        if(similar(imageData, i)) {
            temp.push([0.95]);
            temp.push([0.95]);
        }
        else {
            temp.push([imageData[i + 1] / 255.0]);
            temp.push([imageData[i + 1] / 255.0]);
        }
        count++;

        if(count == 150) {
            result.push(temp);
            result.push(temp);
            temp = [];
            count = 0;
        }
    }

    return [result];
}

export { setup, capture, calibrate, preProcessImage};