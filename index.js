
document.querySelector('span').innerHTML = 'Test';
function store() {

    history.pushState(null, null, 'http:/calendar/')
    history.go(0)

    let formData = new FormData(document.querySelector('form'))
    let object = {};

    let memberName = '';

    formData.forEach((value, key) => {

        if (key === 'member_name') {
            memberName = value
        }
        object[key] = value;
    });

    let itemsArray = []
    itemsArray.push(object)
    localStorage.setItem(memberName, JSON.stringify(itemsArray))
}

function clearAll() {

    let alles_td = document.getElementsByTagName("td");

    for (let i = 0; i < alles_td.length; i++) {

        if(alles_td[i].className !== 'time_box'){
            alles_td[i].innerHTML = '&nbsp;';
        }
    }
}

function showTasks() {
    let name = document.querySelector('#choose_members').value

    let personInfo = localStorage.getItem(name)
    let parsedPersonInfo = JSON.parse(personInfo);

    if (name === 'All members'){
        const items = {...localStorage}

        Object.keys(items).forEach(name => {
            let info = JSON.parse(items[name])
            memberInfo(info)
        })

    } else {
        memberInfo(parsedPersonInfo)
    }
}



function memberInfo(personInfo){
    let name = document.querySelector('#choose_members').value

    if (personInfo && personInfo.length) {
        personInfo.forEach(personData => {

            let td = document.getElementById(`${personData.time}_${personData.day}`)
            let div = document.createElement('div')
            td.prepend(div)

            div.innerHTML = '<button  id = "button_delete"  class="cl-btn-7"></button>';
            div.prepend(personData.event_text)
            let result = (personData.items)

            let button_delete = document.getElementById("button_delete");

            document.getElementById("button_delete").onclick = () => {

                button_delete.innerHTML = '<div id="my_modal" class="modal"></div>'
                let my_modal = document.querySelector('#my_modal')
                my_modal.innerHTML = '<div class="modal_content" id="modal_content"></div>'
                let modal_content = document.querySelector('#modal_content')
                modal_content.innerHTML = `<p class="text_modal">Are you sure you want to delete  ${personData.event_text} event?</p>`
                modal_content.insertAdjacentHTML("beforeend", '<button type="button"  id = "button_no"  class="button_no">NO</button>')
                modal_content.insertAdjacentHTML("beforeend", '<button  id = "button_yes"  class="button_yes">YES</button>')
                let modal = document.getElementById("my_modal");
                let button_no = document.getElementById('button_no')
                let button_yes = document.getElementById('button_yes')

                button_delete.onclick = () => {
                    modal.style.display = "block";
                }
                button_no.onclick = () => {
                    div.style.display = "none";
                }
                button_yes.onclick = () => {
                    localStorage.removeItem(name);
                    div.remove();
                }
                window.onclick = (event) => {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                }
            }
        })
    }
}
