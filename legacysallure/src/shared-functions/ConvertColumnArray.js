export function ConvertColumnArray(data, numberedColumnNames) {
    let infoBlock = {};
    data.map((element, index) => {
        infoBlock[numberedColumnNames[index+1]] = element;
    });
    return infoBlock
}
