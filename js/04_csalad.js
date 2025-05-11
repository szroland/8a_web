function checkTask() {
    let checks = [

        checkContent("Név", "tr:nth-child(2) > td:nth-child(1)", not(contains("nevem"))),
        checkContent("Táblázat keret", "table", hasBorder),

        checkSelector("Második családtag", "tr:nth-child(3) > td", 3),
        checkSelector("Harmadik családtag", "tr:nth-child(4) > td", 3),

    ];
    displayResult(checks);
}

checkTask();