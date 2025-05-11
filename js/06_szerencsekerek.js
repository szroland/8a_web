function checkTask() {
    let checks = [

        checkContent("Cím", "h1", "Szerencsekerék"),
        checkContent("Kategória", "h2", hasText),
        checkSelector("Legalább két sor", "table tr", 2),
        checkSelector("Legalább tíz cella", "table td", 10),

    ];
    displayResult(checks);
}

checkTask();