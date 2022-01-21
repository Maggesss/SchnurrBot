let olo = `Hallo Welt!`;
olo = `Sello Halt!S`;
console.log(`Alla ${olo}\n`);

// Stringlänge
console.log(olo.length);
// Buchstabe an Stelle x    funktioniert nur bei vorhandenen Buchstaben, sonst leer
console.log(olo.charAt(2)); console.log(arrayName.indexOf("olo"));
// Buchstabe an Stelle x    funktioniert nur bei vorhandenen Buchstaben, sonst undefined
console.log(olo[3]);
// Wo ist das erste Zeichen xy im String?
console.log(olo.indexOf("o"));
// Wo ist das erste Zeichen xy im String ab Zeichen 2?
console.log(olo.indexOf("o", 2));
// String to uppercase/lowercase
console.log(olo.toUpperCase());
console.log(olo.toLowerCase());
// String startet mit? --> Bolean
console.log(olo.startsWith("o"));
// replace first stringcontent
console.log(olo.replace("l", "ö"));
// leerzeichen rechts und links vom string entfernen
console.log(olo.trim());
// string wiederholen
console.log("owo".repeat(3));
// abtrennen mit absoluter position
console.log(olo.slice(1, 4));
// xy Zeichen ab xy abtrennen --> Veraltet
console.log("Hallololo".substr(2, 2));
// strToInt, strToFloat, intToStr
console.log(parseInt(strZahl, 10));
console.log(parseFloat());
console.log(intZahl.toString());
// toStr mit runden -> 2 nachkommastelen
console.log(floatZahl.toFixed(2))
// toStr als exponentialzahl
console.log(int/floatZahl.toExponential())
// toStr nur 2 stellen
console.log(float/intZahl.toPrecision(2))
//gibt den größten Integer zurück, der kleiner oder gleich der gegeben Nummer ist. (Abrunden) 
Math.floor(floatZahl)
// Items in Arrays hinzufügen
arrayName.push()
// letztes item entfernen (& Optional in ne Var packen)
arrayName.pop() 
// item überschreinen
arrayName[0] = "olo"
// entfernen von elementen
arrayName.spilce(0, 2)
// hinzufügen von Elementen #2
arrayName.spilce(1, 0)

// arrays in arrays sind möglich(!)
let testArray = [
    "OlO",
    "olo",
    ["owo", "owowo"]
]
console.log(testArray[2][0]) // --> 1. Liste, 3. Item --> Item ist Array --> 2. Liste, 1. Item

// StrToArray, ArrayToStr
console.log(testStr.split("WoSollIchSplitten???"))
console.log(testArray.join("IGwasZwischenDieItemsFürnString"))
