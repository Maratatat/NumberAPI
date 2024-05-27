import { AddListItem } from "./submit_forms.js"
import { SortLocalStorage } from "./localStorage.js"
import { EncryptDecrypt } from "./encryption.js"

window.addEventListener('load', function () {
    const SortedLocalStorage=SortLocalStorage()
    for (let index = 0; index < SortedLocalStorage.localStorageArray.length; index++) {
        let item=JSON.parse(SortedLocalStorage.localStorageArray[index])
        if(item.user.login===current_user.login){
        AddListItem(EncryptDecrypt(JSON.parse(SortedLocalStorage.localStorageArray[index]).answer), true, SortedLocalStorage.numericKeys[index])
       }
    }
}) 