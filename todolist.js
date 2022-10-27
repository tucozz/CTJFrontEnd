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
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}"><br>`;
		date.innerHTML = `<input type="date" class="form-control" value="${todo.date}">`;
		description.innerHTML = `<input type="text" class="form-control" value="${todo.description}">`;
		deleteButton.innerHTML = 'Deletar';

		label.appendChild(input);
		label.appendChild(span);
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

		content.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.addEventListener('blur', (e) => {
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})
		date.addEventListener('click', (e) => {
			const dateInput = date.querySelector("input");
			dateInput.addEventListener('blur', (e) => {
				todo.date = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})
		description.addEventListener('click', (e) => {
			const textarea = description.querySelector("input");
			textarea.addEventListener('blur', (e) => {
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
