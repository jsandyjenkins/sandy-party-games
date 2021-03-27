var input = document.getElementById("wordInput");
input.placeholder = "Enter here";
var currentWord = Math.round(Math.random() * 94);
const myHeading = document.querySelector('h1');
const errorBox = document.querySelector('p');
var obj;
let tense_list = ['past_simple', 'past_participle'];
var tense = tense_list[Math.round(Math.random())];

fetch('./js/json/irreg_verbs.json')
    .then(res => res.json())
    .then((out) => {
        console.log('Output: ', out);
		obj=out;
		myHeading.textContent = tense + ': ' + obj.word_list[currentWord].infinitive;
}).catch(err => console.error(err));

input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
	if (event.keyCode === 13) {
		event.preventDefault();
		check_input();
	}
});

document.getElementById("myBtn").addEventListener("click", function() {
	event.preventDefault();
		check_input();
});

function check_input(){
	if (input.value === obj.word_list[currentWord][tense]) {
		new_word();
	}else{
		errorBox.textContent = obj.word_list[currentWord][tense];
	}
};

function new_word(){
	currentWord = Math.floor(Math.random() * 94);
	tense = tense_list[Math.round(Math.random())];
	myHeading.textContent = tense + ': ' + obj.word_list[currentWord].infinitive;
	input.value = "";
	errorBox.textContent = "";
};


