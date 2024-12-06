console.log("Hello world!")
console.log("i dont know")

// variables

const wow = " ewfdsagyufg"
var trash = "hi"

trash = "bye"

console.log(trash + wow)

// for loop
const max = 5
for (let i = 1; i <= max; i++) {
    console.log(i)
}

// random
var random = Math.floor(Math.random() * 10) / 10
var odd = (1 / 2) // in percent...

console.log((odd * 100) + "% chance of being lucky")
console.log(random + " / " + odd)

if (random <= odd) {
    console.log("Lucky.")
}
else {
    console.log("Unlucky.")
}