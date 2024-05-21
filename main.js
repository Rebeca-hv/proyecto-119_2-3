prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:350,
    height:270,
    image_format:'png',
    png_quality: 90
});

camera =  document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'" />';
    })
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/ehJAjNu0w/model.json',modelLoaded);

function modelLoaded(){
    console.log("modelo cargado");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "la primer predicción es: " + prediction_1;
    speak_data_2 = "la segunda predicción es: " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if (results[0].label == "amor y paz"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if (results[0].label == "chill"){
            document.getElementById("update_emoji").innerHTML = "&#129305;";
        }
        if (results[0].label == "te quiero"){
            document.getElementById("update_emoji").innerHTML = "&#129311;";
        }
        if (results[0].label == "perfecto"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if (results[0].label == "saludo"){
            document.getElementById("update_emoji").innerHTML = "&#128406;";
        }
        if (results[0].label == "bien"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if (results[1].label == "amor y paz"){
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
        if (results[1].label == "chill"){
            document.getElementById("update_emoji2").innerHTML = "&#129305;";
        }
        if (results[1].label == "te quiero"){
            document.getElementById("update_emoji2").innerHTML = "&#129311;";
        }
        if (results[1].label == "perfecto"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if (results[1].label == "saludo"){
            document.getElementById("update_emoji2").innerHTML = "&#128406;";
        }
        if (results[1].label == "bien"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
    }
}