/*
There once was a [noun] named [name]
*/

var MWurl = "https://dictionaryapi.com/api/v3/references/sd3/json/";
var MWkey = "?key=e56ebded-99c9-48df-b2ee-6bc1b56509a4";


var limerick, name, subject, pronoun;

var subjects = ['doctor', 'lawyer', 'teacher', 'student', 'person', 'waiter', 'scientist', 'artist', 'painter', 'driver', 'worker'];

var malenames = ['James', 'Pete', 'Pierre', 'John', 'Ray', 'Stan', 'Joe', 'Jake', 'Jay', 'Dan', 'Clark'];
var femalenames = ['Sue', 'Mary', 'Anne', 'Ann', 'Jane', 'Liz', 'May', 'June', 'Grace', 'Beth', 'Claire'];
var articles_pronouns = ['the', 'a/an', 'his/her'];
var prepphrases = ['at', 'with', 'on', 'by', 'for'];
var fanboys = ['for', 'and', 'nor', 'but', 'or', 'yet', 'so'];

var line1 = "There once was _a/an_ _noun1_ named _name_";
var line2 = "Who _verb1_ _article1_ _adj1_ _noun2_ _preposition_ _article2 _noun3_";  
var line3 = "_article3_ _verb2_ _article4_ _noun4_";
var line4 = "_conj1_ _verb3_ article5 _noun5";
var line5 = "_conj2_ _noun6_ _verb4_ _noun7_";



var gender, aan1, noun1, name, verb1, art1, adj1, noun2, prep, art2, noun3, art3, verb2, art4, noun4, conj1, verb3, art5, noun5, conj2, noun6, verb4, noun7; 

var pronoun;
var setPronoun = ["", ""];

var syllableCounts = [0, 0, 0, 0, 0];

var loading, limerick, start, namebox, pronounbox;

var tries = 0;

function setup(){

	limerick = document.getElementById("limerick");
	start = document.getElementById("start");
	limerick.style.visibility = "hidden";
	namebox = document.getElementById("name");
	pronounbox = document.getElementById("pronoun");
	
}

function showLimerick(){
	
	start.innerHTML = "Loading...";
	setTimeout(function(){generate();}, 1000);

}


function generate(){
	
	tries = 0;

	gender = Math.floor(Math.random() * 2);
	if(gender == 0){
		name = malenames[Math.floor(Math.random() * malenames.length)];
		articles_pronouns[2] = 'his';
		pronoun = "He";
	} else {
		name = femalenames[Math.floor(Math.random() * femalenames.length)];
		articles_pronouns[2] = 'her';
		pronoun = "She";
	}

	if(namebox.value != "" && namebox.value != undefined){
		name = namebox.value;
		if(setPronoun[0] != "" && setPronoun[0] != undefined){
			articles_pronouns[2] = setPronoun[1];
			pronoun = setPronoun[0];
		}
	}

	console.log(name);
	noun3 = getWord("https://api.datamuse.com/words?rel_rhy=" + name, 'noun');
	console.log("1");
	noun7 = getWord("https://api.datamuse.com/words?rel_rhy=" + name, 'noun');
	console.log("2");
	noun1 = subjects[Math.floor(Math.random() * subjects.length)];
	console.log("3");
	if(['a', 'e', 'i', 'o', 'u'].indexOf(noun1.charAt(0)) != -1){
		aan1 = "an";
	} else{
		aan1 = "a";
	}
	verb1 = getWord("https://api.datamuse.com//words?ml=run", 'verb');
	console.log("VERB: " + verb1);
	console.log("4");
	noun2 = getWord("https://api.datamuse.com//words?ml=" + verb1, 'noun');
	//adj1 = getWord("https://api.datamuse.com//words?ml=great", 'adjective');
	console.log("5");
	art1 = article(noun2);
	console.log("6");
	prep = prepphrases[Math.floor(Math.random() * prepphrases.length)];
	art2 = article(noun3);
	verb2 = getWord("https://api.datamuse.com//words?ml=" + verb1, 'verb');
	//verb2 = conjugate(verb2);
	console.log("7");
	noun4 = getWord("https://api.datamuse.com//words?ml=" + noun3, 'noun');
	console.log("8");
	art4 = article(noun4);
	conj1 = fanboys[Math.floor(Math.random() * fanboys.length)];
	verb3 = getWord("https://api.datamuse.com//words?ml=" + verb2, 'verb');
	//verb3 = conjugate(verb3);
	console.log("9");
	noun5 = getWord("https://api.datamuse.com//words?rel_rhy=" + noun4, 'noun');
	console.log("10");
	art5 = article(noun5);
	conj2 = fanboys[Math.floor(Math.random() * fanboys.length)];
	noun6 = getWord("https://api.datamuse.com//words?ml=" + noun4, 'noun');
	console.log("11");
	verb4 = getWord("https://api.datamuse.com//words?ml=" + verb3, 'verb');
	//verb4 = conjugate(verb4);
	console.log("12");

	/***
var line1 = "There once was _a/an_ _noun1_ named _name_";
var line2 = "Who _verb1_ _article1_ _adj1_ _noun2_ _preposition_ _article2 _noun3_";  
var line3 = "_article3_ _verb2_ _article4_ _noun4_";
var line4 = "_conj1_ _verb3_ article5 _noun5";
var line5 = "_conj2_ _noun6_ _verb4_ _noun7_";
***/

	line1 = ("There once was " + aan1 + " " + noun1 + " named " + name);
	line2 = ("Who " + verb1 + " " + art1 + " " + noun2 + " " + prep + " " + art2 + " " + noun3);
	line3 = (pronoun + " " + verb2 + " " + art4 + " " + noun4);
	line4 = (conj1 + " " + verb3 + " " + art5 + " " + noun5);
	line5 = (conj2 + " the " + noun6 + " " + verb4 + " the " + noun7);

	limerick.style.visibility="visible";
	limerick.innerHTML = line1 + "<br>" + line2 + "<br>" + line3 + "<br>" + line4 + "<br>" + line5;

	if(limerick.innerHTML.indexOf("???") != "-1"){
		limerick.innerHTML = "Limerick could not be generated, please try again";

	}
	
	start.innerHTML = "Click to Generate";

	//console.log(noun3);
	//console.log(noun7);

}


$(document).ready(function(){
  $("#start").fadeIn(3000);
  $("#start").click(function(){
    $("#limerick").show();
  });
});

/***
function getWord(url, pos){
  $.getJSON(url).done(function(data) {
	  fl = '';
	  rand = Math.floor(Math.random() * (data.length/2));
	  while(data[rand].numSyllables > 3){
	  	rand = Math.floor(Math.random() * (data.length/2));
	  }
	  word = data[rand].word;
	  console.log(word);

  	  const promise1 = new Promise(function(resolve, reject) {
  		$.getJSON(MWurl + word + MWkey).done(function(data) {
	  		//console.log(MWurl + word + MWkey);
	  		fl = data[0].fl;
			resolve(fl);
  		});
	  });
	  promise1.then(function(value) {
		fl = value;
		console.log(pos);
		console.log(fl);
		if(fl == pos){
			return word;
		}
		else{
			getWord(url, pos);
		}
	  });
  });
}
***/

function getWord(url, pos){

	tries++;
	console.log(tries);

	if(tries < 50){

		$.ajax({
			url: url,
			dataType: 'json',
			async: false,
			//data: data,
			success: function(data) {
				fl = '';
				var count = Math.floor(Math.random() * (data.length/2));
				while((data[count] == undefined || data[count].numSyllables > 2) && count < data.length){count++;}
				if(count < data.length){
					word = data[count].word;
				}else{
					word = getWord(url, pos);
				}
				//console.log(word);
				$.ajax({
					url: MWurl + word + MWkey,
					async: false,
					//data: data,
					success: function(data){
						fl = data[0].fl;
					}
				});

			  }
		});
		
		if(fl == pos){
			if(pos == "verb"){
				var url2 = "https://lt-nlgservice.herokuapp.com/rest/english/conjugate?verb=" + word;
				$.ajax({
					url: url2,
					dataType: 'json',
					async: false,
					success: function(data){

						console.log(data);

						if(data.result == "OK"){

							console.log(data.conjugated_forms[1][1]);
							word = data.conjugated_forms[1][1];

						}
						else{
							word = word;
						}

					}
				});
			}
			return word;
		}
		else{
			word = getWord(url, pos);
			return word;
		}

	} else{
			limerick.innerHTML = "Limerick could not be retrieved";
			return "???";
	}

}


function article(noun){
	if(['a', 'e', 'i', 'o', 'u'].indexOf(noun.charAt(0)) != -1){
		art = "an";
	} else{
		art = "a";
	}
	return art;

}


function changePronoun(pro, pos){
	setPronoun[0] = pro;
	setPronoun[1] = pos;
	pronounbox.innerHTML = pro;

}

function jump(pos){
	window.location = 'index.html#' + pos;
}
