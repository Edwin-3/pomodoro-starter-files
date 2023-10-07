window.addEventListener('load', () => {
    const form = document.querySelector('#task_form');
    const input = document.querySelector('#task_input');
    const list_el = document.querySelector('#tasks');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please fill in the task");
            return;
        }

        const task_el = document.createElement('div');
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        const checkbox_el = document.createElement("i");
        checkbox_el.classList.add('bi', 'bi-circle');
        checkbox_el.addEventListener("click", () => {
            if (checkbox_el.classList.contains('bi-circle')) {
                checkbox_el.classList.remove('bi-circle');
                checkbox_el.classList.add('bi-check2-circle');

                task_input_el.style.textDecoration = "line-through";
            } else {
                checkbox_el.classList.remove('bi-check2-circle');
                checkbox_el.classList.add('bi-circle');

                task_input_el.style.textDecoration = "none";
            }
        });

        task_content_el.appendChild(checkbox_el);
        task_content_el.appendChild(task_input_el);


        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        const edit_icon = document.createElement('i');
        edit_icon.classList.add('bi', 'bi-pencil-square');
        task_edit_el.appendChild(edit_icon);
        
        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        const delete_icon = document.createElement('i');
        delete_icon.classList.add('bi', 'bi-trash');
        task_delete_el.appendChild(delete_icon);
        
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        
        task_el.appendChild(task_actions_el);
        
        list_el.appendChild(task_el);
        
        input.value = '';
        
        task_edit_el.addEventListener('click', (e) => {
          if (edit_icon.classList.contains('bi-pencil-square')) {
            edit_icon.classList.remove('bi-pencil-square');
            edit_icon.classList.add('bi-check-square');
            task_input_el.removeAttribute('readonly');
            task_input_el.focus();
          } else {
            edit_icon.classList.remove('bi-check-square');
            edit_icon.classList.add('bi-pencil-square');
            task_input_el.setAttribute('readonly', 'readonly');
          }
        });
        
        task_delete_el.addEventListener('click', (e) => {
          list_el.removeChild(task_el);
        });
        
    })
})