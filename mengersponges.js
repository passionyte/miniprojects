const prompt = require('prompt-sync')() // Menger Sponges - Passionyte

const char = "#"
let sponge = ""

for (let i = 0; (i < 3); i++) {
   // if (!(i % 2 == 0)) {
        for (let y = 0; (y < 3); y++) {
            for (let x = 0; (x < 9); x++) {
                sponge += ((((y + 1) % 2) == 0) && (((x + 2) % 3) == 0)) && " " || char
            }
            sponge += "\n"
        }
   // }
    //else {
    //    for (let y = 0; (y < 3); y++) {
    //        for (let x = 0; (x < 9); x++) {
     //           sponge += (x < 3 && x > 5) && char || " "
    //        }
    //        sponge += "\n"
    //    }
    //}
}
console.log(sponge)