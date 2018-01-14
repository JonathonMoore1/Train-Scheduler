// Initialize Firebase
var config = {
    apiKey: "AIzaSyBVguDcHq3s8ImsqD4HEfi_q0jMqnw5fZQ",
    authDomain: "train-scheduler-72648.firebaseapp.com",
    databaseURL: "https://train-scheduler-72648.firebaseio.com",
    projectId: "train-scheduler-72648",
    storageBucket: "train-scheduler-72648.appspot.com",
    messagingSenderId: "733284910073"
};

firebase.initializeApp(config);

var database = firebase.database();

database.ref().on('child_added', function(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().first_train);
    console.log(childSnapshot.val().frequency);
});

//======================
// Add new row on submit
//======================
$(document).on('click', '#submit', function(e) {

    // Prevent submission
    e.preventDefault();

    // Save the tbody element
    var tBody = $('tbody');
   
    // Save the values the user entered
    var name = $('#name-input').val().trim();
    var destination = $('#dest-input').val().trim();
    var firstTrain = $('#first-input').val().trim();
    var frequency = $('#freq-input').val().trim();

    // Add new row with train information to the table
    tBody.append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
    firstTrain + "</td><td>" + frequency + "</td></tr>");

    // Data object for Firebase
    var dataObj = {
        name: name,
        destination: destination,
        first_train: firstTrain,
        frequency: frequency
    };
   
    database.ref().push(dataObj);
   
});