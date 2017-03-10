// ************************************************************************************************************************************
//   instructions:
//			0. Dont Panic
// 			1. Fork the exercises to create your own personal workspace. You do not have to create an account, anonymous is fine.
// 			2. For each of the jasmine specs (unit tests) below (you don't actually have to know anything about jasmine), make the corrective edits so that the tests pass.
// 			3. Once complete, email me the url for your pen so I can take a look at your answers.
//
//   about-jasmine:
// 			if you are coming from a C# testing background then expect(actual).toBe(expected); is exactly like Assert.AreEqual(expected, actual) 
//
//   notes:
//    * This is not timed, complete at your own pace.
// 		* You may use any resources you like, but you need to be able to explain your answers.
// 	  * Consult the TODO comments for instructions.
// 		* Do not modify expect() calls unless there is an INCOMPLETE value. This is how each test is judged for correctness.
//    * After each edit, the tests should re-run automatically. (a green dot instead of a red X indicates success).
//    * The "Discussion:" points can be filled in if you know the answer, otherwise we can talk through them in more detail. 
// ************************************************************************************************************************************
describe("a good javascript developer", function () {
	"use strict";
  
  it("should understand bools", function() {
    // some people just don't get bools. prove to me that you do.
    function boolean(x, y) {
		return (x === true) || (y === 10)
      // todo: write a function that returns true if the value of x is true, or the value of y is 10, otherwise return false.
    }

    expect(boolean(true, 99)).toBe(true);
    expect(boolean(false, 10)).toBe(true);
    expect(boolean(false, 99)).toBe(false);
  });
  
  it("should understand hoisting", function() {
    var y = -1;

    // Discussion: Why does this work before the variable is declared? Wouldn't this introduce a global?
    x = ++y;
    x++;

    var x = 1;
		// TODO: fill in a value for INCOMPLETE that matches the expected value of X.
    expect(x).toBe(1);

	// discussion:
	//   - the declaration of the variable (ie: var x) is "hoisted" to occur at the beginning of the local scope.
	//   - the assignment of a value to the variable (ie: x=1) remains at the same (relative) position in the code as it appears.
	//     this is the reason that the expected value is equal to this assignment.
	//   - though "hoisting" exists as a feature of ECMAScript,
	//     imho.. using it results in ugly code that's tricky to debug,
	//     and the practice should be avoided.
	//   - a little off-topic, but I agree with "feross" and generally try to abide by his "JavaScript Standard Style" guidelines:
	//         https://github.com/feross/standard
	//         http://standardjs.com/
  });
  
  it("should be able to write a for loop", function() {
		var sum = 0;
    // TODO: write a 'for' loop which sums the EVEN numbers in the range [1 to 50] (inclusive)

	for (var i=2; i<=50; i+=2){
		sum += i
	}

    expect(sum).toBe(650);
  });
  
  it("should understand object literals", function() {
		// TODO: declare an object literal which has the fields 'name' and 'age' 
    // set name to "Bob" and age to 30
    var p = {"name":"Bob", "age":30}

    expect(p.name).toBe("Bob");
    expect(p.age).toBe(30);
  });
  
  it("should understand constructors", function() {
    // TODO: define a constructor function called 'Person' which has the fields 'name' and 'age' 
    // set name to "Bob" and age to 30

	function Person(){
		if (! this instanceof Person){return new Person()}

		this.name = "Bob"
		this.age = 30
	}

    var p = new Person();
    
    expect(p.name).toBe("Bob");
    expect(p.age).toBe(30);
  });

  it("should understand closure", function() {
    var super_secret_key; 

    function match (test) {
      return test === super_secret_key;
    }

    // TODO: Fill in the two INCOMPLETE values for the expectation.
    var before = match("xyz");
    expect(before).toBe(false);

    super_secret_key = "xyz";

    var after = match("xyz");
    expect(after).toBe(true);
    // Discussion: Why does this work?

	// discussion:
	//   - in the 1st call to match, (super_secret_key === undefined)
	//   - in the 2nd call to match, (super_secret_key === "xyz") which is the same type (string) and value as the parameter passed to the function
  });
  
  it("should be able solve generic interview type questions", function () {
    function palindrome(possiblePalindrome) {
		var reverse = possiblePalindrome.split("").reverse().join("")
		return (reverse === possiblePalindrome)

      // TODO: Write a function which tests an input string to determine whether it is the same forwards and backwards.
    }
    
    expect(palindrome("rats live on no evil star")).toBe(true);
    expect(palindrome("this is not a palindrome")).toBe(false);
  });

  it("should understand functional programming concepts", function() {

    // TODO: Write a function which captures some original value and produces a function which
    // returns true if the parameter matches the original value. Think password verification.
    // You don't want to leak the secret to the caller, you just want to tell him if he's right or not.
    var remember = function (secret) {
		return function(val2){
			return (val2 === secret)
		}
    };
    
    // imagine this function is passed somewhere else.
    var match = remember(10);
    var other = remember("bob");

    expect(match(10)).toBe(true);
    expect(match("10")).toBe(false);
    expect(other("bob")).toBe(true);
    expect(other(10)).toBe(false);
  });
  
  it("should understand callbacks", function() {
    // IMPORTANT: Don't change this. This is a result-based function definiton. 
    // It only serves as an example.
    function doWorkWithReturns(value) {
      if (value > 10) {
        return true;
      }
      
      return false;
    }
    
    if (doWorkWithReturns(11)) {
      // yay! pretend there's some code in here.
    } else {
    	// boo... something wasn't quite right...
    }
    
    // ---------------------------------------
    // okay, the actual exercise starts here.
    function doWorkWithCallbacks(value, done, fail) {
		return (value > 10)? done() : fail()

      // re-define the body of doWorkWithReturns so that rather than returning true or false, it invokes a callback function
      // "done()" for true, and "fail()" for false.
    }
  
    // remember: don't panic
    var done = jasmine.createSpy('done'); // seriously, this is okay.
    var fail = jasmine.createSpy('fail'); // these are just functions I can test to see if they've been called.

    doWorkWithCallbacks(11, done, fail);
    
    expect(done).toHaveBeenCalled();
    expect(fail).not.toHaveBeenCalled();
  });

  it("should understand privacy in javascript", function() {
    function maker() {
		var count = 0
		return function(){
			count++
			return count
		}

      // TODO: Write a function which produces a function which counts the number of times it has been 
      // called and returns that value. (Two instances of the function should NOT share the same count.)
    };

    var func = maker();
    var func_2 = maker();

    expect(func()).toBe(1);
    expect(func_2()).toBe(1);
    expect(func_2()).toBe(2);
    expect(func()).toBe(2);
  });

  it("should understand the switch statement, if only to avoid it.", function () {
    function translate(number) {
		var translation
		switch (number){
			case 1:
				translation = "one"
				break
			case 2:
				translation = "two"
				break
			case 3:
				translation = "three"
				break
			case 4:
				translation = "four"
				break
			default:
				translation = "I never learned to count.."
				break
		}
		return translation

      // TODO: Use a switch statement to convert the numbers 1, 2, 3, 4 to their english language equivalents (one, two, three, four)
      // this function should have a single return statement.
    }

    expect(translate(1)).toBe("one");
    expect(translate(2)).toBe("two");
    expect(translate(3)).toBe("three");
    expect(translate(4)).toBe("four");
  });

  it("should destroy all switch statements", function () {
    function translate(number) {
		var translations = {
			1: "one",
			2: "two",
			3: "three",
			4: "four"
		}

		return (typeof translations[number] === undefined)? "I never learned to count.." : translations[number]

      // TODO: Convert the switch statement to a lookup table with the same functionality as before.   
    }

    expect(translate(1)).toBe("one");
    expect(translate(2)).toBe("two");
    expect(translate(3)).toBe("three");
    expect(translate(4)).toBe("four");
    
    // discussion: What is the relationship between code and data?

	// discussion:
	//   - the code defines many possible pathways;
	//     the selection of the right pathway is conditional upon the state of the data.
	//     as such, equality operators are often used to test the data.. and the result is used to choose the next turn to take.
  });

  it("should appreciate the elegance of data structures", function() {
    function translate(number, language) {
		var translations = {
			"en": {
				1: "one",
				2: "two",
				3: "three",
				4: "four"
			},
			"es": {
				1: "uno",
				2: "dos",
				3: "tres",
				4: "quatro"
			}
		}

		return ( (typeof translations[language] === 'object') && (typeof translations[language][number] === 'string') )? translations[language][number] : ''

      // TODO) Using this same lookup table scheme, extend the function so that it can translate the numbers to localized spanish (country-code es) values as well. 
      // 1-4 in spanish is "uno", "dos", "tres", "quatro"
    }

    expect(translate(1, 'en')).toBe("one");
    expect(translate(2, 'en')).toBe("two");
    expect(translate(3, 'en')).toBe("three");
    expect(translate(4, 'en')).toBe("four");

    expect(translate(1, 'es')).toBe("uno");
    expect(translate(2, 'es')).toBe("dos");
    expect(translate(3, 'es')).toBe("tres");
    expect(translate(4, 'es')).toBe("quatro");
  });
  
  it("can think recursively", function() {
    // note: the codepen editor supports collapsing this region if you're tired of seeing it.
    var org_chart = {
      root: {
        title: "CEO", 
        employees: [
          { 
            title: "Chief Financial Officer", 
            employees: [
              {
                title: "VP Finance",
                employees: [
                  {
                    title: "Financial Accounting Manager",
                    employees: [
                      {
                        title: "Financial Accountant III"
                      },
                      {
                        title: "Financial Accountant II"
                      },
                      {
                        title: "Financial Accountant I"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          { 
            title: "Chief Information Officer", 
            employees: [
              { tile: "Admin. Assistant" },
              { 
                title: "VP Information Security", 
                employees: [
                  { tile: "Director Information Security" }
                ] 
              },
              { 
                title: "VP Enterprise Data", 
                employees: [
                  { 
                    tile: "DBA Lead", 
                    employees: [
                      { tile: "DBA II" },
                      { tile: "DBA I" },
                    ] 
                  },
                  { tile: "Data Developer III" },
                  { tile: "Reporting Analyst II" },
                ] 
              },
              { 
                title: "VP Network Infrastructure",
                employees: [
                  { tile: "Sys Ops Manager" },
                  { tile: "Network Ops Manager" },
                ]  
              }
            ]
          }
        ]
      }
    };

/*
    function employee_count (node) {
    	// TODO: given this data structure for an organization,
    	// provide the total employee count for the entire company.
    	
    	// note: it is possible to solve this problem without using recursion,
    	// however it is (in my opinion) more difficult.
  	}
*/

	var employee_count_recursive = function(node){
		var count = 1
		if ( (Array.isArray(node.employees)) && (node.employees.length) ){
			for (var i=0; i<node.employees.length; i++){
				count += employee_count_recursive( node.employees[i] )
			}
		}
		return count
	}

	var employee_count_iterative = function(node){
		var employees, count, employee
		employees = [node]
		count = 0

		while (employees.length){
			employee = employees.shift()
			count++

			if ( (Array.isArray(employee.employees)) && (employee.employees.length) ){
				employees = employees.concat(employee.employees)
			}
		}
		return count
	}

	var employee_count = employee_count_recursive

  	expect(employee_count_recursive(org_chart.root)).toBe(20);
  	expect(employee_count_iterative(org_chart.root)).toBe(20);
  	expect(employee_count(org_chart.root)).toBe(20);
  });
});
