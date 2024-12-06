const prompt = require("prompt-sync")() // Mrs Clark (2.1 - 2.3 practice / quiz maker) - Passionyte (4/2/24)

let questions = [
    {Question: "The 'genus' is the first part of the Taxonomic system ", Answer: "True", Type: "True/False"},
    {Question: "Species are more related the closer their features are ", Answer: "True", Type: "True/False"},
    {Question: "You do not need to capitalize the Latin name of a species ", Answer: "False", Type: "True/False"},
    {Question: "The largest animal class is the Kingdom ", Answer: "True", Type: "True/False"},
    {Question: "State the order of the animal classes (in letters, remember King Peter!) ", Answer: "KPCOFGS", Type: "Answer"},
    {Question: "State the second largest animal class ", Answer: "Phylum", Type: "Answer"},
    {Question: "State the fifth largest animal class ", Answer: "Genus", Type: "Answer"},
    {Question: "The Dichotomous key's result gives you the animal name ", Answer: "True", Type: "True/False"},
    {Question: "Who was the inventor of the Taxonomic system? ", Answer: "Carl Linnaeus", Type: "Bonus", Explanation: "Possible bonus question on the quiz."},
    {Question: "Bacteria is an example of a Microbe ", Answer: "True", Type: "True/False"},
    {Question: "What term do we use to call Micro organisms? ", Answer: "Microbe", Type: "Answer"},
    {Question: "Viruses are alive ", Answer: "False", Type: "True/False"},
    {Question: "Viruses have metabolic functions (i.e. digestion) ", Answer: "False", Type: "True/False"},
    {Question: "All viruses are the same size ", Answer: "False", Type: "True/False"},
    {Question: "Viruses are smaller than animal and bacterial cells ", Answer: "True", Type: "True/False"},
    {Question: "Viruses always kill other cells ", Answer: "False", Type: "True/False", Explanation: "Viruses may choose (selective) to kill cells, not always."},
    {Question: "Viruses are selective ", Answer: "True", Type: "True/False"},
    {Question: "Not all viruses are infectious (spread) ", Answer: "False", Type: "True/False"},
    {Question: "Viruses include a core composed of DNA and RNA ", Answer: "True", Type: "True/False"},
    {Question: "Viruses do not include a protein coat called a capsid ", Answer: "False", Type: "True/False"},
    {Question: "Uncoating is a part of the lytic cycle ", Answer: "True", Type: "True/False"},
    {Question: "State the other name of the lytic cycle ", Answer: "Viral Replication", Type: "Answer"},
    {Question: "The Lysogenic cycle injects virus into host cell DNA ", Answer: "True", Type: "True/False"},
    {Question: "Lytic cycle can take as little as 25 minutes ", Answer: "True", Type: "True/False"},
    {Question: "Vaccines are dead / weakened strains of viruses ", Answer: "True", Type: "True/False"},
    {Question: "Resistant viruses are ones which do respond to vaccines ", Answer: "False", Type: "True/False"},
    {Question: "Gene therapy makes use of 'helpful viruses' to inject DNA and RNA into host cells that people want modified ", Answer: "True", Type: "True/False"},
    {Question: "Oncoloytic viruses attack and eventually destroy cancer cells ", Answer: "True", Type: "True/False"},
    {Question: "Bacteria is not common ", Answer: "False", Type: "True/False", Explanation: "Bacteria is the most common organism on Earth."},
    {Question: "Bacteria is always harmful ", Answer: "False", Type: "True/False", Explanation: "Not all Bacteria is harmful, some can produce things such as vitamins."},
]
const unit = "2.1 - 2.3"
const num = questions.length

let bonuses = 0

for (i = 0; (i < num); i++) {
    if (questions[i].Type == "Bonus") {
        bonuses += 1
    }
}

let correct = 0

function clamp(x, min, max) {
    if (x > max) {
        x = max
    }
    else if (x < min) {
        x = min
    }
    return x
}
 
function random(min, max) {
    return clamp(Math.round((Math.random() * max)), min, max)
}

while (questions.length > 0) {
    const i = random(0, (questions.length - 1))
    const question = questions[i]

    console.log(`Question #${(Math.abs((questions.length - num)) + 1)}. This question is a ${question.Type} question.`)
    
    let answer = prompt(question.Question).toLowerCase()
    
    if (answer == question.Answer.toLowerCase()) {
        correct += 1
        console.log(`Correct! The answer is: ${question.Answer}! ${question.Explanation && "| Explanation:", question.Explanation || ""}`)
    }
    else {
        console.log(`Incorrect! The answer was: ${question.Answer}, be sure to review this! ${question.Explanation && "| Explanation:", question.Explanation || ""}`)
    }
    questions.splice(i, 1)
}

const percent = Math.floor(((correct / (num - 1)) * 100))

console.log(`End of test for ${unit}. You scored: ${correct}/${(num - 1)}. (${percent}%)`)
if (correct >= num) {
    console.log("Great job! You scored perfect!")
}
else if (percent > 80) {
    console.log("Good job! You scored higher than 80%.")
}
else if (percent > 60) {
    console.log("Not bad. You scored higher than 60%. Remember to keep studying, and stay consistent!")
}
else if (percent > 50) {
    console.log("You scored higher than 50%. Be sure to review this unit for the exam, you may need some practice.")
}
else {
    console.log("You scored lower than 50%. You need to review this unit for the exam, study, and prepare accordingly.")
}