function checkTask() {
    let checks = [
        checkContent("Cím", "h1,h2,h3,h4,h5,h6", "Kakaós Csiga elkészítése"),

        checkSelector("Lista", "ol", 1),
        checkSelector("Lista elem", "ol > li", 7),

        checkContent("Lista alatt nincs közvetlen szöveg", "ol", not(hasNonEmptyTextNode)),
        checkContent("ol alatt csak li elemek vannak", "ol", hasOnlySpecificChildren("li")),

        checkContent("felfuttatjuk", "ol > li", "Langyos, cukros tejben az élesztőt felfuttatjuk.")
    ];
    displayResult(checks);
}

checkTask();