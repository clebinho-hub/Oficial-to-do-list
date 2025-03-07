const localStorageKey = 'to-do-list';

function validateIfExistsNewTask()
{
    let values = JSON.parse(localStorage.getItem(localStorageKey)||"[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newtask()
{
    let input = document.getElementById('input-new-task')
    input.style.border = ''  

    // validation
    if(!input.value)
    {
        input.style.border = '1px solid blue'   
        alert('Digite algo para inserir em sua lista')
    }
    else if(validateIfExistsNewTask())
    {
        alert('ideia ja existente')
    }
    else
    {
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey)||"[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values));
        // Clear the input field
       input.value = '';
       // Update the displayed list
        showValues();
    }
    input.value = ''
}

function showValues()
{
    let values = JSON.parse(localStorage.getItem(localStorageKey)||"[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = '';
    for(let i = 0; i < values.length; i++)
    {
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/></svg></button></li>`;
    }

}

function removeItem(data)
{
    let values = JSON.parse(localStorage.getItem(localStorageKey)||"[]");
    values = values.filter(item => item.name !== data);
    localStorage.setItem(localStorageKey,JSON.stringify(values)); 
    showValues() //Update the displayed list after removal
    
    console.log(data)
}
showValues()