const prompt = require('prompt-sync')()

// Javascript Calculator (reimprovised)
// Finished March 1st 2024
// Passionyte

console.log("Welcome to Passionyte's JavaScript calculator.")
console.log("To use singular operations, do not specify a second number.")
console.log("To require a variable, do not specify any number.")
while (true) {
    let number0 = prompt("Enter first number: ")
    let number1 = prompt("Enter second number: ")

    if (number0 != "") {
        let single = (number1 == "")

        number0 = parseInt(number0)
        if (single == false) {
            console.log("Dual operations selected.")
            number1 = parseInt(number1)
        }
        else {
            console.log("Single operations selected.")
        }
    
        let func = prompt("Enter operation: ").toLowerCase()
    
        if (func == "quit") {
            console.log("Ending program.")
            break
        }
    
        if (single == false) {
            if (func == "add") {
                console.log(number0 + number1)
            }
            else if (func == "sub") {
                console.log(number0 - number1)
            }
            else if (func == "mult") {
                console.log(number0 * number1)
            }
            else if (func == "div") {
                if (number0 > 0) {
                    if (number1 > 0) {
                        console.log(number0 / number1)
                    }
                    else {
                        console.log("Invalid division operation.")
                    }
                }
                else {
                    console.log("Invalid division operation.")
                }
            }
            else if (func == "power") {
                console.log(number0 **= number1)
            }
            else if (func == "pow") {
                console.log(Math.pow(number0, number1))
            }
            else {
                console.log(`The dual operation you specified (${func}) is invalid. Please try again.`)
            }
        }
        else {
            if (func == "clamp") { // Hard coded operations such as this will need their own statements. Oh well.
                let min = prompt("Enter minimum: ")
                let max = prompt("Enter maximum: ")
    
                if (number0 > max) {
                    number0 = max
                }
                else if (number0 < min) {
                    number0 = min
                }
    
                console.log(number0)
            }
            else if (Math[func]) {
                if (Math[func].length == 1) {
                    console.log(Math[func](number0))
                }
                else {
                    console.log(`The operation you specified (${func}) is not a single operation. Please try again.`)
                }
            }
            else {
                console.log(`The single operation you specified (${func}) is invalid. Please try again.`)
            }
        }
    }
    else {
        console.log("Variable declaration selected.")
        let desired = prompt("Enter variable name: ")
        if (Math[desired] && typeof(Math[desired]) == "number") {
            console.log(Math[desired])
        }
        else {
            console.log("The desired variable you specified is invalid. Please try again.")
        }
    }
}