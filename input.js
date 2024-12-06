// practicing input yay
const prompt = require('prompt-sync')();

let resp = prompt("Hi how are you? ")

let lowered = resp.toLowerCase()

console.log(`You are ${lowered}?`)