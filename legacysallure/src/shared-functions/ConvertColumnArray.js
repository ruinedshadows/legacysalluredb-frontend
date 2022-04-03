export function ConvertColumnArray(data, numberedColumnNames) {
    let infoBlock = {};
    data.map((element, index) => {
        infoBlock[numberedColumnNames[index]] = element;
    });
    return infoBlock
}
