function printcount(string, times) {
    let result = ""

    for (i = 0; (i < times); i++) {
        result += string
    }

    console.log(result)
}
printcount("hi", 5)

function printsquare(string, x, y) { 
    for (iy = 0; (iy < y); iy++) {
        let line = ""
        for (ix = 0; (ix < x); ix++) {
            line += string
        }
        console.log(line)
    }
}
printsquare("yee", 10, 4)

function fib(n) {
    let last0 = 0
    let last1 = 1

    let nums = ""

    for (i = 0; (i < n); i = (last0 + last1)) {
        nums += i
        last0 = last1
        last1 = i

        if ((last0 + last1) < n) {
            nums += ", "
        }
    }

    console.log(nums)
}
fib(11)

function count(string, char) {
    let times = 0

    for (i = 0; (i < string.length); i++) {
        if (string[i] == char) {
            times += 1
        }
    }

    console.log((times > 0) && times || -1)
}
count("dog", "d")

function squirrel_crypt(string) {
    
}