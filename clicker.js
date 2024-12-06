const prompt = require("prompt-sync")()
const Clock = require("clock")

let clicks = 0
let cps = 0
const OBC = true // Debug mode essentially

// structures
let structures = [
    {Name: "Cursor", Owned: 0, CPS: 1, Price: 15},
]

async function loop() {
    while (true) {
        Clock.sleep(1)
        if (cps > 0) {
            clicks += cps
            console.clear()
            console.log(`${clicks} clicks`)
        }
    }
}
loop()

while (true) {
    let input = prompt()
    if (input.toLowerCase() == "shop") {
        console.log("Welcome to the Shop.", OBC && "Outrageous Builders Club Detected. Purchases are free" || "")

        structures.forEach(struct => {
            let buy = prompt(`[${struct.Name} | Price: ${struct.Price} clicks | You have: ${struct.Owned} | Produces: ${struct.CPS} CPS | Y: Purchase]: `).toLowerCase()
            if (buy == "y") {
                if (clicks >= struct.Price || OBC) {
                    clicks -= !OBC && struct.Price || 0
                    cps += struct.CPS

                    struct.Price *= 1.1
                    struct.Price = Math.floor(struct.Price)
                    struct.Owned += 1

                    console.log(`Purchased! You have: ${clicks} clicks.`)
                }
                else {
                    console.log(`Insufficient clicks! You need ${(struct.Price - clicks)} more clicks.`)
                }
            }
            else {
               console.clear()
            }
        })
    }
    else {
        clicks += 1
        console.clear()
        console.log(`${clicks} clicks`)
    }
}