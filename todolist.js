window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const newTodoForm = document.querySelector('#new-todo-form');

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			date: e.target.elements.dateInput.value,
			description: e.target.elements.textarea.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos();
	})

	DisplayTodos();

})

function DisplayTodos() {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const date = document.createElement('div');
		const actions = document.createElement('div');
		const description = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');

		if (todo.category == 'pessoal') {
			span.classList.add('pessoal');
		} else if (todo.category == 'escola') {
			span.classList.add('escola');
		} else {
			span.classList.add('trabalho');
		}

		content.classList.add('content-todo');
		date.classList.add('date-todo');
		description.classList.add('description-todo');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		date.innerHTML = `<span class="modal fade">${todo.date}</span>`;
		description.innerHTML = `<input type="text" class="form-control" value="${todo.description}" readonly>`;
		edit.innerHTML = 'Editar';
		deleteButton.innerHTML = 'Deletar';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(date);
		todoItem.appendChild(description);
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
			const dateInput = date.querySelector("dateInput");
			dateInput.removeAttribute('readonly');
			dateInput.focus();
			dateInput.addEventListener('blur', (e) => {
				dateInput.setAttribute('readonly', true);
				todo.date = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
			const textarea = description.querySelector("textarea");
			textarea.removeAttribute('readonly');
			textarea.focus();
			textarea.addEventListener('blur', (e) => {
				textarea.setAttribute('readonly', true);
				todo.description = e.target.value;
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
