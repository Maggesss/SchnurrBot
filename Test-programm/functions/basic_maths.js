// === Taschenrechner ===

function add(var1, var2) {
    return var1 + var2
}

function subtract(var1, var2) {
    return var1 - var2
}

function divide(var1, var2) {
    return var1 / var2
}

function multiply(var1, var2) {
    return var1 * var2
}

function square(var1) {
    return var1 * var1
}

// === Sleep ===

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
   }

// === Timer ===

function getTime(startTime, stopTime) {
    Time = stopTime - startTime
    Hours = Math.floor(Time / 3600000)
    Minutes = Math.floor((Time % 3600000) / 60000)
    Seconds = Math.floor((Time % 3600000) / 1000)

    if (Hours < 10) {
        Hours =`0${Hours.toString()}`
    }
    if (Minutes < 10) {
        Minutes =`0${Minutes.toString()}`
    }
    if (Seconds < 10) {
        Seconds =`0${Seconds.toString()}`
    }

    console.log(`${Hours}h:${Minutes}m:${Seconds}s`)
    return
}

module.exports = { add, subtract, divide, multiply, square, getTime, sleep}