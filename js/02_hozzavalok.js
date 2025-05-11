function checkTask() {
    let checks = [
        checkContent("Hozzávalók", "h1,h2,h3,h4,h5,h6", "Hozzávalók"),
        checkContent("A töltelékhez", "h1,h2,h3,h4,h5,h6", "A töltelékhez"),
        checkContent("A tetejére", "h1,h2,h3,h4,h5,h6", "A tetejére"),

        checkContent("Liszt", "li", "liszt"),
        checkContent("Cukor", "li", "cukor"),
        checkContent("Só", "li", "só"),

        checkSelector("Lista", "ul", 3),
        checkSelector("Lista elem", "ul > li", 5),
    ];
    displayResult(checks);
}

checkTask();