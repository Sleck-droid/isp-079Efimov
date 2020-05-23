const todoControl = document.querySelector('.todo-control'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed'),
todoContainer = document.querySelector('.todo-container');

let obj = [
{
    value: 'Сварить кофе',
    completed: false
},
{ 
    value: 'Помыть посуду',
    completed: true
}];

Load();

const render = () =>
{
    Save();

    todoList.textContent='';
    todoCompleted.textContent='';
    
    if (obj == null)
    {
        obj = [];
    }

    obj.forEach((el) =>
    {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${el.value}</span>
        <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
        </div>`;
        if (el.completed) 
        {
            todoCompleted.append(li);
        }
        else 
        {
            todoList.append(li);
        }
    })
}

todoControl.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const input = todoControl.querySelector('input');
    if ((input.value != '') && !(/^\s+$/.test(input.value)))
    {
        newObj = {value: input.value,completed: false};
        obj.push(newObj);
        console.log(obj);
        input.value = '';
    }
    else
    {
        input.value = '';
    }
    render();
}) 

const Search = (elem) => 
{
    const elemText = elem.querySelector('.text-todo').textContent;
    const elemCompleted = elem.closest('.todo-completed');
    let result = null;
    obj.forEach((element, index) => 
    {
        if(element.value === elemText)
        {
            if(element.completed == (elemCompleted != null))
            {
                result = index;
            }
        }
    })
    return result;
}

function Save()
{
    //localStorage.setItem('objects', JSON.stringify(obj));
    Cookie('objects', JSON.stringify(obj), 2020, 5, 30);
}

function Cookie(value, completed, year, month, day, path, domain, sequre)
{
    let strCookie = value + '=' + completed;
    const date = new Date (year, month, day);
    strCookie += '; ' + 'expires' + date.toGMTString();
    strCookie += path ? '; path=' + path : '';
    strCookie += domain ? '; domain=' + domain : '';
    document.cookie = strCookie;
}

function Load()
{
    // obj = JSON.parse(localStorage.getItem('objects'));
    obj = JSON.parse(Cookies('objects'));
}

function Cookies(name)
{
    var results = document.cookie.match ('(^|;) ?' + name + '=([^;]*)(;|$)');
    if(results)
    {
        return (unescape(results[2]));
    }
    else
    {
        return null;
    }
}

todoContainer.addEventListener('click',(e)=>
{
    e.preventDefault();
    const target = e.target;
    if (!target.matches('button'))
    {
        return;
    }
    if (target.matches('.todo-remove'))
    {
        obj.splice(Search(target.closest("li")), 1);
    }
    if(target.matches('.todo-complete'))
    {
        obj[Search(target.closest('li'))].completed = !obj[Search(target.closest('li'))].completed;
    }
    render();
})

render();
