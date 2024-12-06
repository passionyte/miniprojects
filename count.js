const prompt = require("prompt-sync")() // Passionyte

let text = ""
let linelength

function words(string) {
    let count = 0
    let last = ""

    for (let i = 0; (i < string.length); i++) {
        let char = string[i]
        
        if ((char == " " && (last != char)) || (i == (string.length - 1))) {
            count += 1
        }

        last = char
    }

    return count
}

function breakat(string) {
    let broken = ""

    for (let i = 0; (i < string.length); i++) {
        if ((i % linelength) == 0) {
            broken += "\n"
        }
        broken += string[i]
    }

    return broken
}

while (!linelength || isNaN(linelength)) {
    linelength = parseInt(prompt("Enter Line Length: "))
}

while (true) {
    console.log(`Chars: ${text.length} Words: ${words(text)} Lines: ${(Math.round(text.length / linelength))}`)
    text += breakat(prompt(text))
}