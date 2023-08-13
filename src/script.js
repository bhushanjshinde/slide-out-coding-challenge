document.addEventListener('DOMContentLoaded', function() {
    const slideOutButton = document.getElementById('slideOutButton');

    slideOutButton.addEventListener('click', function() {
        let position = 0;
        const duration = 1000;
        const frames = duration / 5;
        const intervalTime = duration / frames;

        const interval = setInterval(function() {
            if (position <= window.innerWidth) {
                position += 0.5;
                slideOutButton.style.transform = 'translateX(-' + position + 'px)';
            } else {
                clearInterval(interval);
            }
        }, intervalTime);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const replicateMeButton = document.getElementById('replicateMeButton');

    replicateMeButton.addEventListener('click', function() {

        replicateMeButton.removeEventListener('click', arguments.callee);

        let lastInsertedElement = replicateMeButton;

        for (let i = 1; i <= 10; i++) {
            const clone = replicateMeButton.cloneNode(true);
            clone.textContent = `Replicate Me ${i}`;
            clone.id = 'replicateMeButton'+i; // set ID for the sake of completeness, but not using for click event.

            lastInsertedElement.parentNode.insertBefore(clone, lastInsertedElement.nextSibling);

            lastInsertedElement = clone;

            clone.addEventListener('click', function() {
                console.log(i); // Log the index to the console
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const loadTodosButton = document.getElementById('loadTodosButton');
    const todosTableContainer = document.getElementById('todosTableContainer');

    loadTodosButton.addEventListener('click', function() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => {
                const todos = data.slice(0, 10); //limiting to first 10 records

                let tableHTML = `
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>User ID</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>`;

                todos.forEach(todo => {
                    tableHTML += `
                    <tr>
                        <td>${todo.id}</td>
                        <td>${todo.title}</td>
                        <td>${todo.userId}</td>
                        <td>${todo.completed}</td>
                    </tr>
                `;
                });

                tableHTML += `</tbody></table>`;

                todosTableContainer.innerHTML = tableHTML;
            })
            .catch(error => {
                console.error('Error fetching the to do list:', error);
            });
    });
});