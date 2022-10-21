//calendario

const diasTag = document.querySelector(".dias"),
    dataAtual = document.querySelector(".data-atual"),
    iconesMovimento = document.querySelectorAll(".icones span");

let date = new Date(),
    anoAtual = date.getFullYear(),
    mesAtual = date.getMonth();

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]; // array dos meses

const renderCalendar = () => {
    let priDiaMes = new Date(anoAtual, mesAtual, 1).getDay(),
        ultDataMes = new Date(anoAtual, mesAtual + 1, 0).getDate(),
        ultDiaMes = new Date(anoAtual, mesAtual, ultDataMes).getDay(),
        ultDatadoUltMes = new Date(anoAtual, mesAtual, 0).getDate();
    let liTag = "";

    for (let i = priDiaMes; i > 0; i--) { // cria li dos dias do mes anterior
        liTag += `<li class="inactive">${ultDatadoUltMes - i + 1}</li>`;
    }

    for (let i = 1; i <= ultDataMes; i++) { // cria li dos dias do mes atual
        let hojeEh = i === date.getDate() && mesAtual === new Date().getMonth()
            && anoAtual === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${hojeEh}">${i}</li>`;
    }

    for (let i = ultDiaMes; i < 6; i++) { // cria li dos dias do proximo mes
        liTag += `<li class="inactive">${i - ultDiaMes + 1}</li>`
    }
    dataAtual.innerText = `${meses[mesAtual]} ${anoAtual}`; // retorna o mes e o ano atual
    diasTag.innerHTML = liTag;
}
renderCalendar();

iconesMovimento.forEach(icon => { // administra os icones de movimentação dos meses
    icon.addEventListener("click", () => {
        mesAtual = icon.id === "anterior" ? mesAtual - 1 : mesAtual + 1;

        if (mesAtual < 0 || mesAtual > 11) { // se o mes atual < 0 ou mes atual> 11
            // cria-se uma nova data do ano e o mes é alterado
            date = new Date(anoAtual, mesAtual);
            anoAtual = date.getFullYear(); // atualiza o ano
            mesAtual = date.getMonth(); // atualiza o mes
        } else {
            date = new Date(); // passa o valor da data atual
        }
        renderCalendar();
    });
});

//lista de tarefas
window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}
