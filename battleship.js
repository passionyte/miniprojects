const prompt = require('prompt-sync')()

// Javascript Battleship (reimprovised)
// Finished March 1st 2024
// Passionyte

// properties
const size = 32 // Size of board
let xsolved = false
let ysolved = false
let solved = 0
const amount = 1 * Math.round((Math.random() * 8) + 1) // Amount of ships

function format(x) {
    let add = `th`
    if (x == 1) {
        add = `st`
    }
    if (x == 2) {
        add = `nd`
    }
    if (x == 3) {
        add = `rd`
    }
    return x + add
}

function progress() {
    let progress = "("

    if (xsolved) {
        progress += x + ", "
    }
    else {
        progress += "?, "
    }
    if (ysolved) {
        progress += y
    }
    else {
        progress += "?"
    }

    progress +=  ")"
    return progress
}

console.log(`There are ${amount} enemy ships!`)
console.log(`Try to find and shoot them down!`)
while (solved < amount) {
    x = Math.floor(Math.random() * size)
    y = Math.floor(Math.random() * size)

    // console.log(x, y)
    
    while (true) {
        if (xsolved == false) {
            inputx = prompt(`Enter X: `)
        }
        if (ysolved == false) {
            inputy = prompt(`Enter Y: `)
        }

        if ((inputx == x)) {
            console.log(`Solved X!`)
            xsolved = true
            inputx = null
        } 
        if ((inputy == y)) {
            console.log(`Solved Y!`)
            ysolved = true
            inputy = null
        } 
        console.log(progress())

        if (xsolved && ysolved) {
            solved += 1
            xsolved = false
            ysolved = false
            console.log(`You shot down the ${format(solved)} ship!`)
            break
        }
        else {
            console.log(`Miss!`)
        }
    }
}
console.log(`You destroyed all ${amount} ships! Congratulations!`)