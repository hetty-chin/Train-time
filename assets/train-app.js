window.onload = function () {

  // initialize Firebase
  var config = {
    apiKey: "AIzaSyCQOmJlziYCpadZWOHrhtyK8XcyLj8CBCs",
    authDomain: "train-scheduler-5605d.firebaseapp.com",
    databaseURL: "https://train-scheduler-5605d.firebaseio.com",
    projectId: "train-scheduler-5605d",
    storageBucket: "train-scheduler-5605d.appspot.com",
    messagingSenderId: "1005904033190"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  //button for adding trains
  document.getElementById("add-train-btn").addEventListener("click", function (event) {
    event.preventDefault();

    // grabs train input
    var trainName = document.querySelector("#train-name-input").value.trim();
    var destination = document.querySelector("#destination-input").value.trim();
    var firstTrain = moment(document.querySelector("#first-train-input").value.trim(), "HH:mm").format("hh:mm");
    var frequency = document.querySelector("#frequency-input").value.trim();

    // creates local "temporary" object for holding employee data
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };

    // uploads train data to the database
    database.ref().push(newTrain);

    // logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    // clears all of the text-boxes
    document.querySelector("#train-name-input").value = "";
    document.querySelector("#destination-input").value = "";
    document.querySelector("#first-train-input").value = "";
    document.querySelector("#frequency-input").value = "";
  });

  // create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    // train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // create a temp object of our values
    let tempTrainData = {
      trainName: trainName,
      destination: destination,
    };

    // Prettify the frequency https://www.w3resource.com/javascript-exercises/javascript-date-exercise-13.php

    var frequencyPretty = ""
    if (frequency > 59) {
      frequencyPretty = timeConvert(frequency);
    } else {
      frequencyPretty = frequency + " minute(s)";
    }
    function timeConvert(n) {
      var num = n;
      var hours = (num / 60);
      var rhours = Math.floor(hours)
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + " hour(s) and " + rminutes + " minute(s)";
    }

    // add frequency to tempTrainData Object
    tempTrainData.frequency = frequencyPretty

    // calculate the minutes until the next train comes

    // First Train (pushed back 1 year to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var timeRemainder = diffTime % frequency;
    console.log(timeRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // add the timeRemainder to the tempTrainData Object
    tempTrainData.minutesAway = tMinutesTillTrain;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // add nextTrain to tempTrainData Object
    tempTrainData.nextTrain = nextTrain;

    // this console logs the train name, destination, formatted frequency, minutes away, next train that we added to the tempdata
    console.log(tempTrainData);
// -------- something happens here that isn't working 
    // create the new row
    var newRow = document.createElement("tr");

    // loop through the childSnapshot object

    for (let prop of Object.values(tempTrainData)) {
      let newTd = document.createElement("td");
      newTd.innerText = prop;
      newRow.appendChild(newTd);
    }

    // append the new row to the table 
    document.querySelector("#train-table > tbody").appendChild(newRow);

  }); 
};