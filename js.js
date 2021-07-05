let allTask = JSON.parse(localStorage.getItem('task')) || [];
let inp = null;
let valueInp = '';
let currentIndex = -1;

window.addEventListener('load', ()=>{
    inp = document.querySelector('.inp');
    let btn = document.querySelector('.btn');
    inp.addEventListener('change', onChangeInp);
    btn.addEventListener('click', onPressBtn);
    localStorage.setItem('task', JSON.stringify(allTask));
    let btnClear = document.querySelector('.btnClear');
    btnClear.addEventListener('click', clearAllTask);
    allTask = JSON.parse(localStorage.getItem('task'));
    render();
})

clearAllTask = () =>{
    localStorage.clear();
    allTask = [];
    render();
}

onChangeInp = () =>{
    valueInp = inp.value;
}

onPressBtn = () =>{
    allTask.push({
        text: valueInp,
        isCheck: false
    })
    valueInp = '';
    inp.value = '';
    render();
    localStorage.setItem('task', JSON.stringify(allTask));
}

render = () =>{
    let content = document.querySelector('.contentPage');
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
    filterTask();
    allTask.forEach((elem, index) => {
        let container =  document.createElement('div');
        container.id = `task-${index}`;
        container.className = 'content-container';

        let checBox = document.createElement('input');
        checBox.type = 'checkbox';
        checBox.className = 'checkBox';
        checBox.checked = elem.isCheck; 
         container.appendChild(checBox);
        checBox.addEventListener("change", () =>{
            onChangeCheckbox(index);
        })
        console.log('currentIndex', currentIndex)
        if(currentIndex === index){
        let inputEdite = document.createElement('input');
        inputEdite.value = elem.text;
        inputEdite.className = 'inputEdite';  
        container.appendChild(inputEdite); 
        inputEdite.addEventListener('change', (e) =>{
            allTask[currentIndex].text = e.target.value;
            localStorage.setItem('task', JSON.stringify(allTask));
            console.log(allTask[currentIndex]);
            render();
        })
        }else{
        let text = document.createElement('p');
        text.className = elem.isCheck ? 'text-task done-text' : 'text-task';
        text.innerHTML = elem.text;
        container.appendChild(text);
        localStorage.setItem('task', JSON.stringify(allTask));
        }

        if(currentIndex === index){
        let imgSubmit = document.createElement('img');
        imgSubmit.className = 'imgSubmit';
        imgSubmit.src = 'images.png';
        container.appendChild(imgSubmit);
        imgSubmit.addEventListener('click',() =>{
            currentIndex = -1;
            localStorage.setItem('task', JSON.stringify(allTask));
            render();
        })
        
    }else{
         let btnEdite = document.createElement('img');
        btnEdite.src = 'png-transparent-computer-icons-editing-svg-edit-others-angle-online-editing-line.png';
        btnEdite.className = 'btnEdite';
        container.appendChild(btnEdite);
        btnEdite.addEventListener('click', () =>{
            currentIndex = index;
            localStorage.setItem('task', JSON.stringify(allTask));
            render();
        })
        
    }
        let btnDel = document.createElement('img');
        btnDel.src = 'delete-sign--v2.png';
        btnDel.className = 'btnDelite';
        btnDel.addEventListener('click',() =>{
            allTask.splice(index, 1);
            localStorage.setItem('task', JSON.stringify(allTask));
            render();
        })
        container.appendChild(btnDel);
        content.appendChild(container);
    });
}

filterTask = () =>{
    let ActiveTask = [];
    let ComplitedTask = [];
    console.log(ComplitedTask);
    allTask.forEach(item => {
        if(item.isCheck === true){
            ActiveTask.push(item);
        }else{
            ComplitedTask.push(item);
        }
    })
    allTask = [...ComplitedTask, ...ActiveTask];

    /*
    const activeTask = allTask.length && allTask.filter(item => item.isCheck == false); 
    const complitedTask = allTask.length && allTask.filter(item => item.isCheck == true); 
    allTask = [...activeTask, ...complitedTask];
    */
}

onChangeCheckbox = (index) =>{
    allTask[index].isCheck = !allTask[index].isCheck;
    localStorage.setItem('task', JSON.stringify(allTask));
    render();
}