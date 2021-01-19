var video = null;

const setup = () => {
    video = document.getElementById('video');

    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function(obj) {video.srcObject = obj; video.play()});   
}

const capture = () => {
    return video;
}

const preProcessImage = (imageData) => {
    var result = [];
    var temp = [];
    var count = 0;
    for(let i = 0; i < 90000; i++) {
        if(i % 4 == 2) {
            temp.push([imageData[i] / 255.0]);
            temp.push([imageData[i] / 255.0]);
            count++;
        }
        if(count == 150) {
            result.push(temp);
            result.push(temp);
            temp = [];
            count = 0;
        }
    }

    return [result];
}

export { setup, capture , preProcessImage};