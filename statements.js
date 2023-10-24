Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:99
});

    camera = document.getElementById("camera");

    Webcam.attach("camera");

function startClassification()
{
    Webcam.snap(function(data_url)
    {
        document.getElementById("result").innerHTML = "<img id = 'captured_image' src = '" + data_url + "'>";
    })
}

console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/oMBnUG5L6/model.json", modelLoaded);

function modelLoaded() 
{
    console.log("Model Loaded");
}

function speak()
{
    synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is " + prediction_1;
    speak_data_2 = "The Second Prediction is " + prediction_2;
    speakThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(speakThis);  
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name_1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if((results[0].label) == "happy")
        {
            document.getElementById("result_emoji_1").innerHTML = "&#128522;";
        }
        if((results[0].label) == "sad")
        {
            document.getElementById("result_emoji_1").innerHTML = "&#128546;";
        }
        if((results[0].label) == "laughing")
        {
            document.getElementById("result_emoji_1").innerHTML = "&#128512;";
        }
        if((results[0].label) == "angry")
        {
            document.getElementById("result_emoji_1").innerHTML = "&#128545;";
        }

        if((results[1].label) == "happy")
        {
            document.getElementById("result_emoji_2").innerHTML = "&#128522;";
        }
        if((results[1].label) == "sad")
        {
            document.getElementById("result_emoji_2").innerHTML = "&#128546;";
        }
        if((results[1].label) == "laughing")
        {
            document.getElementById("result_emoji_2").innerHTML = "&#128512;";
        }
        if((results[1].label) == "angry")
        {
            document.getElementById("result_emoji_2").innerHTML = "&#128545;";
        }
    }
}