function checkTask() {
    let checks = [

        checkContent("Cím", "h1", hasText),
        checkSelector("Legalább két album", "table > tbody > tr", 2),
        checkSelector("Legalább két track lista", "td > ol", 2),
        checkSelector("Legalább 10 szám", "ol > li", 10),
        checkSelector("Legalább 2 kép", "td > img", 2),

        checkContent("Számlista: nincs közvetlen szöveg", "li", hasNonEmptyTextNode, 0),
        checkSelector("Első sor fejléc", "table tr:first-child th", 3),
        checkSelector("Szám hossza", "li > *:nth-child(2)", 5),
    ];
    displayResult(checks);
}

checkTask();