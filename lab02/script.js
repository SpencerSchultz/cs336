/** 
 *  @author Spencer Schultz
 *  09/14/2016
 *  script.js is a simple script to explore the abilities of JavaScript
 *  as an object oriented language (i.e. Encapsulation, Inheritance, 
 *  and Polymorphism).
 */ 

//2.1-------------------------------------------------------------------
function Person(name, birthdate, friends) {
	this.name = name;
	this.birthdate = birthdate;
	this.friends = [];
}

Person.prototype.setName = function(newName) {
	this.name = newName;
}

//copied from Naveen Jose on jsfiddle.net
Person.prototype.getAge = function() {
    var today = new Date();
    var birthDate = new Date(this.birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

Person.prototype.addFriend = function(friend) {
	this.friends.push(friend);
}

Person.prototype.printFriends = function() {
	for (var friend of this.friends) {
		console.log(friend);
	}
}

Person.prototype.printGreeting = function() {
	console.log("Hi, I'm a person, and my name is " + this.name);
}


//2.2 ---------------------------------------------------------------
function Student(name, birthdate, friends, studySubject) {
	Person.call(this, name, birthdate, friends);
	this.studySubject = studySubject;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.printGreeting = function() {
	console.log("Hi, I'm a student, and my name is " + this.name);
}


//tests--------------------------------------------------------------
var p1 = new Person("John", "1973/12/08");
p1.addFriend("Karla");
p1.addFriend("Jimmy");
p1.printGreeting();
console.log(p1.getAge());
p1.printFriends();
p1.setName("RacoonBaboon");
p1.printGreeting();

var s1 = new Student("Cici", "1977/11/22");
s1.addFriend("Karla");
s1.addFriend("Jimmy Johns");
s1.printGreeting();
console.log(s1.getAge());
s1.printFriends();
s1.setName("RacoonBaboon2");
s1.printGreeting();
console.log(s1 instanceof Person);

