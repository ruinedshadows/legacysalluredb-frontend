export function ConvertRowsToPages(cardNum, cardsLimit, rows) {
    let pageNum = 0;
    let page = {};
    let unfilledPage = 1;
    let pageEntries = [];
    let pageCount = 0;
    rows.forEach((entry, index) => {
        if(index === cardNum-1) {
            pageEntries.push(entry)
        }
        if (pageCount === cardsLimit || index === cardNum-1) {
            page[unfilledPage] = pageEntries;
            pageEntries = [];
            pageNum = unfilledPage;
            pageCount = 0;
            unfilledPage++;
        }
        pageEntries.push(entry)
        pageCount++;
    })
    return {"page":page, "pageNum":pageNum}
}