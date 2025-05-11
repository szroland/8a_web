function checkTask() {
    let checks = [

        checkSelector("Táblázat", "table", 1),
        checkSelector("8 sor", "table tr", 8),
        checkSelector("64 cella", "table tr td", 64),

        checkContent("Világos király", "tr:nth-child(8) td:nth-child(5)", exact("♔") ),
        checkContent("Sötét király", "tr:nth-child(1) td:nth-child(5)", exact("♚") ),

    ];
    displayResult(checks);
}

checkTask();