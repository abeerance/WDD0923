// Lösung für Übung 3
type SupportedType = number | string | boolean | number[];

function processData(data: SupportedType): number | boolean {
  // Type Guard für number
  if (typeof data === "number") {
    return data * 2;
  }

  // Type Guard für string
  if (typeof data === "string") {
    return data.length;
  }

  // Type Guard für boolean
  if (typeof data === "boolean") {
    return !data;
  }

  // Type Guard für Array
  if (Array.isArray(data)) {
    // Wir wissen bereits aus dem Typ, dass es number[] ist,
    // aber TypeScript benötigt explizite Einengung
    return data.reduce((sum, current) => sum + current, 0);
  }

  // Dies sollte aufgrund der Typüberprüfung von TypeScript nie passieren,
  // aber wir fügen es der Vollständigkeit halber ein
  throw new Error("Nicht unterstützter Datentyp");
}

// Testfälle
console.log(processData(10)); // 20
console.log(processData("hallo")); // 5
console.log(processData(true)); // false
console.log(processData([1, 2, 3, 4])); // 10
