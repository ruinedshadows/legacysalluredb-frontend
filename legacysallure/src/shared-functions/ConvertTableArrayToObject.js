export function ConvertTableArrayToObject(row, header) {
    let rowEntries = {}
    row.map((columnValue, index) =>(
        rowEntries[Object.values(header)[index]]=columnValue
        ))
    return rowEntries
}