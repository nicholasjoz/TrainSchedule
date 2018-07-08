var config = {
    apiKey: "AIzaSyA-os8r3FRH_hJWP-JO7piKFBd5JpaBaIE",
    authDomain: "trainschedule-8282c.firebaseapp.com",
    databaseURL: "https://trainschedule-8282c.firebaseio.com",
    projectId: "trainschedule-8282c",
    storageBucket: "trainschedule-8282c.appspot.com",
    messagingSenderId: "482203565884"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

  var current = moment().format("HH:mm");
  var array = current.split(":");
    var hours = parseInt(array[0]);
    var minutes = parseInt(array[1]);
    var trainName="";
    var trainDest="";
    var trainNext="";
    var trainFreq=0;

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

     trainName = $("#train-name-input").val().trim();
     trainDest = $("#dest-input").val().trim();
     trainNext = $("#next-input").val().trim();
     trainFreq = $("#freq-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDest,
        next: trainNext,
        freq: trainFreq
      };

      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.next);
      console.log(newTrain.freq);

      // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#next-input").val("");
  $("#freq-input").val("");
});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(snapshot) {
    var newRow = $("<tr>");
    var addRow = snapshot.val();
    var nextTime = addRow.next;
    var nextArray = nextTime.split(":");
    //.split creates an aray of things

    var nextHours = parseInt(nextArray[0]);
    var nextMinutes = parseInt(nextArray[1]);

    var resultHours = nextHours - hours;
    var resultMinutes = nextMinutes - minutes;
    var nextTrain = nextTime;
    var resultHours = resultHours * 60;
    var resultMinutes = resultHours + resultMinutes;
    function nextArrival() {
            if (resultMinutes < 0) {
                resultMinutes += parseInt(addRow.freq);
                nextMinutes += parseInt(addRow.freq);
                nextArrival();
            }
            else if (resultMinutes > parseInt(addRow.freq)) {
                resultMinutes -= parseInt(addRow.freq);
                nextMinutes -= parseInt(addRow.freq);
                nextArrival();
            }
            else if (nextMinutes >= 60) {
                nextHours += 1;
                nextMinutes -= 60;
                if (nextHours > 24) {
                    nextHours -= 24;
                }
                nextArrival();
            }
            else if (nextMinutes < 0) {
                nextHours -= 1;
                nextMinutes += 60;
                if (nextHours < 0) {
                    nextHours += 24;
                }
                nextArrival();
            }
        }
    nextArrival()
    
    nextMinutes = String(nextMinutes);
    if (nextMinutes.length === 1) {
        nextMinutes = "0" + nextMinutes;
    }
    if (nextHours === 12) {
        nextTrain = String(nextHours) + ":" + nextMinutes + " PM";
    }
    else if (nextHours >= 13) {
        nextHours -= 12;
        nextTrain = String(nextHours) + ":" + nextMinutes + " PM";
    }
    else {
        nextTrain = String(nextHours) + ":" + nextMinutes + " AM";
    }
    
    console.log(addRow.name);
    console.log(addRow.destination);
    console.log(addRow.freq);

    /* newRow.append("<tr><td>" + addRow.name + "</td><td>" + addRow.destination + "</td><td>" +
    addRow.freq + "</td><td>" + nextTrain + "</td><td>" + resultMinutes + "</td></tr>");

    $("#employee-row").append(newRow); */

    newRow.append("<td>" + addRow.name + "</td>");
    newRow.append("<td>" + addRow.destination + "</td>");
    newRow.append("<td>" + addRow.freq + "</td>");
    newRow.append("<td>" + nextTrain + "</td>");
    newRow.append("<td>" + resultMinutes + "</td>");
    
    $("#train-table").append(newRow);

  });
    
    
    /* // first thing before comma, if you set as .Val it takes most recent added
    //prevChildKey would deal with accessing beforehand
    // "child just got added, take snapshot so we can do things with it"
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainNext = childSnapshot.val().next;
    var trainFreq = childSnapshot.val().freq;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDest);
  // Problem line below  
    console.log(trainNext);
    console.log(trainFreq);
  
    var nextTime= $("#next-input").val().trim();

    console.log(nextTime);
   // var nextTime = addRow.start;
    var nextArray = nextTime.split(":");
    //.split creates an aray of things

    var nextHours = parseInt(nextArray[0]);
    var nextMinutes = parseInt(nextArray[1]);

    var schedHours= nextHours-hours;
    var schedMinutes= nextMinutes-minutes;

    var timeTilNext= schedHours*60 + schedMinutes;
    
    // Prettify the employee start
    var trainStartPretty = moment.unix(trainNext).format("MM/DD/YY");

var trainNextConv = moment(trainNext, "HH:mm");
console.log(trainNextConv);

var currentTime = moment();
console.log("Current Time:  " +moment(currentTime).format(" hh:mm"));

// TIme comes through as "1541836800"

//Need to figure out Moments/fully walk through with Tutor
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
  // var empMonths = moment().diff(moment(empStart, "X"), "months");
 //   console.log(empMonths);
  
    // Calculate the total billed rate
 //   var empBilled = empMonths * empRate;
 //   console.log(empBilled);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + trainDest + "</td><td>" + timeTilNext + "</td></tr>");
  });
   */