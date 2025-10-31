var firebaseConfig = {
  apiKey: "AIzaSyDF8n-ERjVze5z2R8gtpuIVB9-jh2GpHmA",
  authDomain: "quiz-application-70c08.firebaseapp.com",
  projectId: "quiz-application-70c08",
  storageBucket: "quiz-application-70c08.firebasestorage.app",
  messagingSenderId: "221522439177",
  appId: "1:221522439177:web:b3346f340e779d19c9dcd8",
  databaseURL: "https://quiz-application-70c08-default-rtdb.firebaseio.com",
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.database();

var questions = [
  {
    question: "Q1: HTML Stands for?",
    option1: "Hyper Text Markup Language",
    option2: "Hyper Tech Markup Language",
    option3: "Hyper Touch Markup Language",
    corrAnswer: "Hyper Text Markup Language",
  },
  {
    question: "Q2: CSS Stands for?",
    option1: "Cascoding Style Sheets",
    option2: "Cascading Style Sheets",
    option3: "Cascating Style Sheets",
    corrAnswer: "Cascading Style Sheets",
  },
  {
    question: "Q3: Which tag is used for most large heading?",
    option1: "<h6>",
    option2: "<h2>",
    option3: "<h1>",
    corrAnswer: "<h1>",
  },
  {
    question: "Q4: Which tag is used to make element unique?",
    option1: "id",
    option2: "class  ",
    option3: "label",
    corrAnswer: "id",
  },
  {
    question: "Q5 :Any element assigned with id, can be get in css?",
    option1: "by # tag",
    option2: "by @ tag",
    option3: "by & tag",
    corrAnswer: "by # tag",
  },
  {
    question: "Q6: CSS can be used with ______ methods.",
    option1: "8",
    option2: "3",
    option3: "4",
    corrAnswer: "3",
  },
  {
    question: "Q7: In JS variable types are ____________?",
    option1: "6",
    option2: "3",
    option3: "8",
    corrAnswer: "8",
  },
  {
    question: "Q8: In array we can use key name and value?",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
  {
    question: "Q9: toFixed() is used to define length of decimal?",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "True",
  },
  {
    question:
      "Q10: push() method is used to add element in the start of array?",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
];

var quesElement = document.getElementById("ques");
var opt1 = document.getElementById("option1");
var opt2 = document.getElementById("option2");
var opt3 = document.getElementById("option3");
var index = 0;
var nextBtn = document.getElementById("btn");
var score = 0;
// var min = 1;
// var sec = 59;

// var Timer;
// function startTimer() {
//   Timer = setInterval(timer, 100);
// }
// function timer() {
//   var timeElement = document.getElementById("time");
//   timeElement.innerHTML = min + ":" + sec;
//   sec--;
//   if (sec < 0) {
//     min--;
//     sec = 59;
//     if (min < 0) {
//       clearInterval(Timer);
//       next();
//       min = 1;
//       sec = 59;
//       startTimer();
//     }
//   }
// }
// startTimer();
next();
function next() {
  var allInputs = document.getElementsByTagName("input");

  for (var i = 0; i < allInputs.length; i++) {
    if (allInputs[i].checked) {
      allInputs[i].checked = false;
      var userSelectedValue = allInputs[i].value;

      var selectedOption = questions[index - 1]["option" + userSelectedValue];
      var correctOption = questions[index - 1]["corrAnswer"];

      //   console.log(selectedOption);
      //   console.log("correct ans ", correctOption);

      if (selectedOption === correctOption) {
        score++;
      }
    }
  }

  nextBtn.disabled = true;
  sendtoDB();

  if (index > questions.length - 1) {
    var progress = (score / questions.length) * 100;
    if (progress <= 50) {
      Swal.fire({
        title: "You Need To Improve",
        text: progress,
        icon: "success",
      });
    }
    if (progress <= 30) {
      Swal.fire({
        title: "Try to prepare better next time",
        text: progress,
        icon: "error",
      });
    }

    if (progress >= 70) {
      Swal.fire({
        title: "Keep up the Good Work",
        text: progress,
        icon: "success",
      });
    }
    if (progress >= 85) {
      Swal.fire({
        title: "Good Job!",
        text: progress,
        icon: "success",
      });
    }
  } else {
    quesElement.innerText = questions[index].question;
    opt1.innerText = questions[index].option1;
    opt2.innerText = questions[index].option2;
    opt3.innerText = questions[index].option3;
    index++;
  }
}

function tigger() {
  nextBtn.disabled = false;
}

function sendtoDB() {
  for (var i = 0; i < questions.length; i++) {
    var q = questions[i];
    console.log(q);
    var obj = {
      quest: q.question,
      corrAns: q.corrAnswer,
    };
    firebase.database().ref("Ques_CorrAns").push(obj);
  }

}
