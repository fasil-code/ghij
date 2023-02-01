let addressBook = [
  {
    Name: "sunil kumar",
    Street: "station road",
    Locality: "patel nagar",
    District: "indore",
    State: "madhya pradesh"
    },
    {
    Name: "ramesh patel",
    Street: "shastri marg",
    Locality: "saket nagar",
    District: "bhopal",
    State: "madhya pradesh"
    },
    {
    Name: "suresh sharma",
    Street: "rajendra nagar",
    Locality: "gandhi nagar",
    District: "new delhi",
    State: "delhi"
    },
    {
    Name: "ravi gupta",
    Street: "palika bazaar",
    Locality: "kanpur",
    District: "kanpur nagar",
    State: "uttar pradesh"
    },
    {
    Name: "anand patel",
    Street: "sardar patel road",
    Locality: "ahmedabad",
    District: "ahmedabad",
    State: "gujarat"
    }
   
];
let size=addressBook.length;
let objsize =Object.values(addressBook[0]).length;
let rand=Math.floor(Math.random()*size);
//Store the random number in local storage
localStorage.setItem("rand", rand);

for(let i=0;i<objsize;i++){
  document.getElementById("w"+i).innerHTML = Object.entries(addressBook[rand])[i][0] + ": " + Object.entries(addressBook[rand])[i][1];

}
function textToAudio(num){
    const msg = new SpeechSynthesisUtterance(
      Object.values(addressBook[rand])[num]
      
    );
    msg.lang = "hi-IN";
  
  const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "hi-IN");
        
        msg.voice = voices[1];
        msg.volume = 1;
        msg.rate=0.8;
        msg.pitch = 0.8;
        window.speechSynthesis.cancel(msg);
        window.speechSynthesis.speak(msg);
  
  }
  // repeats back spoken words
function repeat(message){
  let text;
  if (message === "") {
    text = "Please speak";
  } else {
    text = "You said " + message;
  }   
  const msg = new SpeechSynthesisUtterance(text);

  msg.lang = "hi-IN";

const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "hi-IN");
      msg.voice = voices[0];
      msg.volume = 1;
      msg.rate = 0.8;
      msg.pitch = 1;
      window.speechSynthesis.cancel(msg);
      window.speechSynthesis.speak(msg);

}
// audio to text
let ans=new Array();
// Define a function to start speech recognition
function audioToText(i){
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
  ans[i]=message;
  // Check if the recognition process has completed
  if (event.results[0].isFinal) {
    // Stop recognition if the process has completed
    recognition.stop();
  }
});
recognition.addEventListener('end', () => {
  // Display a message when recognition ends
  document.getElementById('recognition-status').textContent = '🟢 Voice Recognition ended';
  repeat(message);
  
});
recognition.start();
}
function scoring(){
  let score=0;
  for(let i=0;i<5;i++){
     if(ans[i]==Object.values(addressBook[rand])[i]){
              if(i==0){
                score+=3;
              }
              else{
                score++;
              }
      } 
  }
    console.log(score);
    window.location.href=nextUrl;
    localStorage.setItem("score", score);
}

