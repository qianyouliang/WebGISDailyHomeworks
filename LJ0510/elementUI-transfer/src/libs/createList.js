import { v4 as UUID } from 'uuid'
export function createList (length) {
    const list = []
    let isDisabled = false
    for (let i = 0; i < length; i++) {
        if(i % 4 == 0) {
             isDisabled=true
        }else{
             isDisabled=false
        }
        list.push({
        id: UUID(),
        value: `option${i}`,
        isChecked: false,
        isDisabled: isDisabled
        })
    }
    return list
}