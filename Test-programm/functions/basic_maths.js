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

function timerStartStop() {
    return Date.now()
}

function getTime(startTime, stopTime) {
    let Time
    let Hours
    let Minutes
    let Seconds
    Time = (stopTime - startTime)
    Hours = Math.floor(Time / 3600000)
    Minutes = Math.floor((Time % 3600000) / 60000)
    Seconds = Math.floor((Time % 60) / 1000)
    console.log(`${Hours}:${Minutes}:${Seconds}`)
    return
}

module.exports = { add, subtract, divide, multiply, square, timerStartStop, getTime, sleep}