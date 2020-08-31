var currentQuestion = 0;
var totQuestions = questions.length;
var score = 0;

var container = document.getElementById('quizContainer');
var questionEl = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');

var radio1 = document.getElementById('radio1');
var radio2 = document.getElementById('radio2');
var radio3 = document.getElementById('radio3');
var radio4 = document.getElementById('radio4');

var nextBtn = document.getElementById('nextButton');
var prevBtn = document.getElementById('prevButton');
var resultCont = document.getElementById('result');
var notifyCont = document.getElementById('notify');
var notifyCont2 = document.getElementById('notify2');
var notification = document.getElementById('check');
var notification2 = document.getElementById('check2');
var sideNav = document.getElementById('sideNav');
var name;
var mins = 10;
var secs = mins * 60;
var timer = document.getElementById('timer')

window.onload = evt =>{
  name = prompt('Enter your name to begin');
  countdown();
}

function showResult(){
  container.style.display = 'none';
  resultCont.style.display = '';
  notifyCont.style.display = 'none';
  notifyCont2.style.display = 'none';
  resultCont.textContent =  `${name} ` + 'your score is ' + score + ' out of 100';
  timer.style.display = 'none';
}

function countdown() {
    setTimeout('Decrement()', 60);
}

function Decrement() {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");

        if (seconds < 59) {
            seconds.value = secs;
        }

        else {
            minutes.value = getminutes();
            seconds.value = getseconds();
        }

        if (mins < 1) {
            minutes.style.color = "red";
            seconds.style.color = "red";
        }

        if (mins < 0) {
            showResult();
            minutes.value = 0;
            seconds.value = 0;
        }
        else {
            secs--;
            setTimeout('Decrement()', 1000);
        }
    }
}

function getminutes() {
    mins = Math.floor(secs / 60);
    return mins;
}

function getseconds() {
    return secs - Math.round(mins * 60);
}

function shuffle(array){
  array.sort(() => Math.random() - 0.5);
}

shuffle(questions);

for(let i=0; i<totQuestions; i++){
    let qn = document.createElement('div')
    qn.className = 'qNumber'
    qn.id = 'qn'+i
    qn.textContent = i+1
    qn.addEventListener('click', () => {
        currentQuestion = i
      loadQuestion(currentQuestion);

    })
    sideNav.appendChild(qn);
}

function notify(){
  container.style.display = 'none';
  notifyCont.style.display = '';
  }

  function notify2(){
    container.style.display = 'none';
    notifyCont2.style.display = '';
    }

  function goOn(){
    container.style.display = '';
    notifyCont.style.display = 'none';
  }

  function goOn2(){
    container.style.display = '';
    notifyCont2.style.display = 'none';
  }

function loadQuestion(){
  console.log(currentQuestion)
  radio1.checked = false
  radio2.checked = false
  radio3.checked = false
  radio4.checked = false

  var answer = questions[currentQuestion].userInput;

  if (questions[currentQuestion].answered){
    // document.querySelector('input[type=radio]:checked');

    switch(answer){
      case "1": {
        radio1.checked = true
        console.log("1 checked")
        break
      }
      case "2": {
        radio2.checked = true
        console.log("2 checked")
        break
      }
      case "3": {
        radio3.checked = true
        console.log("3 checked")
        break
      }
      case "4": {
        radio4.checked = true
        console.log("4 checked")
        break
      }
    }
  }

  questionEl.textContent = '(Q' + (currentQuestion+1) + '.)  ' + questions[currentQuestion].question;
  opt1.textContent = '   ' + questions[currentQuestion].option1;
  opt2.textContent = '   ' + questions[currentQuestion].option2;
  opt3.textContent = '   ' + questions[currentQuestion].option3;
  opt4.textContent = '   ' + questions[currentQuestion].option4;

  var show = document.getElementById(`qn${currentQuestion}`);
if(!questions[currentQuestion].answered)
  {show.style.background = 'darkblue';}
  if(currentQuestion == totQuestions-1){
    nextBtn.textContent = 'Finish';
  }
  else{
    nextBtn.textContent = 'Next';
  }

  if(currentQuestion == 0){
    prevBtn.style.display = 'none';
  }
  else {
    prevBtn.style.display = '';
  }

  }


  function loadNextQuestion() {

      var selectedOption = document.querySelector('input[type=radio]:checked');
      if(!selectedOption){
        alert("Please select an option to proceed!")
      }


      var answer = selectedOption.value;

      if(!questions[currentQuestion].answered){
        console.log("Option selected"+answer)
        questions[currentQuestion].userInput = answer;
        questions[currentQuestion].answered = true;
      }

      if(answer == questions[currentQuestion].answer){
        score += 10;
        console.log('correct answer marked');
        var show = document.getElementById(`qn${currentQuestion}`);
        show.style.background = 'green';
        notify();
      }
      else{
        console.log('incorrect answer marked');
        var show = document.getElementById(`qn${currentQuestion}`);
        show.style.background = 'red';
        notify2();
      }

      currentQuestion++;

      if(currentQuestion == 0){
        prevBtn.style.display = 'none';
      }
      else {
        prevBtn.style.display = '';
      }

      if(currentQuestion == totQuestions-1){
        nextBtn.textContent = 'Finish';
      }

      if(currentQuestion != totQuestions-1){
        nextBtn.textContent = 'Next';
      }

      if(currentQuestion == totQuestions){
          showResult();
      }


      loadQuestion();

}

function loadPrevQuestion(){

  var selectedOption = document.querySelector('input[type=radio]:checked');
  if(!selectedOption){
    alert('Please select an option to proceed');
    return;
  }

  var answer = selectedOption.value;

  if(!questions[currentQuestion].answered){
    questions[currentQuestion].userInput = answer;
    questions[currentQuestion].answered = true;
  }

  var selectedOption = document.querySelector('input[type=radio]:checked');
  var answer = selectedOption.value;

  if(answer == questions[currentQuestion].answer){
    console.log('correct answer marked');
    var show = document.getElementById(`qn${currentQuestion}`);
    show.style.background = 'green';
    notify();
  }
  else{
    console.log('incorrect answer marked');
    var show = document.getElementById(`qn${currentQuestion}`);
    show.style.background = 'red';
    notify2();
  }

  selectedOption.checked = false;

  currentQuestion--;
  console.log("previous buttnon count incremented");

  if(currentQuestion == 0){
    prevBtn.style.display = 'none';
  }
  else {
    prevBtn.style.display = '';
  }

  if(currentQuestion == totQuestions-1){
    nextBtn.textContent = 'Finish';
  }
  else{
    nextBtn.textContent = 'Next';
  }

  loadQuestion();

}

if(currentQuestion == 0){
  prevBtn.style.display = 'none';
}
else {
  prevBtn.style.display = '';
}

loadQuestion();
