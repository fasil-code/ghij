
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn=document.getElementById("next-btn");
const recordButton = document.getElementById("record-btn");
startTimer(60); //calling startTimer function
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const randomIndex = Math.floor(Math.random() * alphabet.length);
let randomLetter = alphabet[randomIndex];
randomLetter=randomLetter.toUpperCase();
document.getElementsByClassName("letter")[0].innerHTML=randomLetter;
document.getElementById("instruction").innerHTML="Record as many words as you can starting with letter "+`<span class="randLetter">'${randomLetter}'</span>`+", but not names of people or places";
document.getElementsByClassName("randLetter")[0].style.color="yellow";

// audio to text
let answers=new Array();
// Define a function to start speech recognition
function audioToText(){
let message="";
const recognition = new webkitSpeechRecognition() || window.SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-IN';

// Set up event listeners for the Web Speech API
recognition.addEventListener('start', () => {
  // Display a message when recognition starts
  document.getElementById('recognition-status').textContent = '🔴 Voice Recognition started';
});
recognition.addEventListener('result', (event) => {
  // Get the transcribed text
  const transcript = event.results[0][0].transcript;

  message=transcript;
  message=message.toLowerCase();
  if(message[message.length-1]==="."){
  message=message.slice(0,-1);
  }
  // Check if the recognition process has completed
  if (event.results[0].isFinal) {
    // Stop recognition if the process has completed
    recognition.stop();
  }
});
recognition.addEventListener('end', () => {
  // Display a message when recognition ends
  document.getElementById('recognition-status').textContent = '🟢 Voice Recognition ended';
  if(answers.indexOf(message)==-1){
    answers.push(message);
}
  document.getElementById("text").innerHTML = "Record next word";
  animateText();
});
recognition.start();
 // Stop recognition after 4 seconds
 setTimeout(() => {
    recognition.stop();
  }, 4000);
}
//animate text
function animateText() {
    const textElement = document.getElementById("text");
    textElement.classList.add("animate");
    setTimeout(() => {
      textElement.classList.remove("animate");
    }, 1000);
  }
 //do scoring
 
 function scoring(){
  let count= 0,score=0;
  const checkWord = (word) => {
    return new Promise((resolve) => {
      const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      fetch(URL)
        .then((response) => {
          if (response.ok) {
            count++;
            
          } 
          resolve();
        })
        .catch((error) => {
          console.log(error);
          resolve();
        });
    });
  };

  if (!answers || !answers.length){
    return;
  } 
  const promises = [];
  for (let i = 0; i < answers.length; i++) {
    let word = answers[i];
    if (word.length > 2 && word[0]==randomLetter.toLowerCase()) {
      promises.push(checkWord(word));
    }
    console.log(word);
  } 
  Promise.all(promises)
    .then(() => {
      
     if(count>14){
      score=7;
     }
     else if(count>=11 && count<=14){
      score=6;
     }
     else if(count>=8 && count<=10){           
      score=5;           
     }           
     else if(count>=6 && count<=7){           
      score=4;           
     }           
     else if(count>=3 && count<=5){           
      score=3;           
     }           
    else if(count==2){
      score=2
    }
    else if(count==1){
      score=1
    }
    else{
      score=0;
    }
    console.log(score);
  });
  
}
//timer functions 
function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
      timeCount.textContent = time; //changing the value of timeCount with time value
      time--; //decrement the time value
      if(time < 9){ //if timer is less than 9
          let addZero = timeCount.textContent; 
          timeCount.textContent = "0" + addZero; //add a 0 before time value
      }
      if(time < 0){ //if timer is less than 0
          clearInterval(counter); //clear counter
          scoring(); //call scoring function since time is over.
          timeText.textContent = "Time Over"; //change the time text to time off
          timeCount.textContent = "00"; //change the timeCount to 00
          next_btn.style.visibility="visible"; //make next button visible again since time is over.
          recordButton.disabled = true; //disable the record button since time is over.
          document.getElementById('recognition-status').innerHTML = '🔴 Time  Over'; //change the status to time over.';
          
        }
  }
}