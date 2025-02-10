const countertitle = document.getElementById('title')
const bt = document.getElementById('create')
const listName = document.getElementById('list')


let personalNotes = JSON.parse(localStorage.getItem('notes')) || [];
function saveToUpdate (){
    localStorage.setItem('notes', JSON.stringify(personalNotes));
}

function counter () {
    listName.innerHTML =''
    if (personalNotes.length === 0) {
        listName.innerHTML = '<p>Нет заметок!</p>'
    }
    for (let i = 0; i < personalNotes.length; i++){
        listName.insertAdjacentHTML('beforeend', registration(personalNotes[i], i))
    }
}
counter()
bt.onclick = function() {
    if (countertitle.value.length === 0) {
        return
    }
    const newob = {
        title:countertitle.value,
        complited: false,
    }
    personalNotes.push(newob)
    counter()
    saveToUpdate ()
    countertitle.value = ''
}
listName.onclick = function(){
    if (event.target.dataset.index) {
        const index = Number(event.target.dataset.index)
        const type = event.target.dataset.type
        if (type ==='toggle') {
            personalNotes[index].complited = !personalNotes[index].complited
        }
        else if (type ==='remove'){
            personalNotes.splice(index,1)
        }
        counter()
        saveToUpdate ()
    }
}
function escape(unsafe){
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function registration (zar,index) {
    const safeTitle = escape(zar.title);
    return `
    <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span class = "${zar.complited ? 'text-decoration-line-through': ''}">${safeTitle}</span>
          <span>
            <span class="btn btn-small btn-${zar.complited? 'warning': 'success'}" data-index="${index}"data-type="toggle">&check;</span>
            <span class="btn btn-small btn-danger"data-type="remove" data-index="${index}">&times;</span>
          </span>
        </li>
    `
}