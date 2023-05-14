export const cmpArrays = <T>(arr1 : Array<T>, arr2 : Array<T>) => {
    const output : Array<T> = []
    if (arr1.length === 0)
        return arr2
    if (arr2.length === 0)
        return arr1
    arr1.forEach(x => {
        if (!arr2.includes(x))
            output.push(x)
    })
    return output;
}