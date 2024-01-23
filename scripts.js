document.addEventListener('DOMContentLoaded', function () {
    const snippetList = document.getElementById('snippet-list');
    const addSnippetForm = document.getElementById('add-snippet-form');

    function renderSnippets() {
        fetch('http://localhost:3001/api/snippets')
            .then(response => response.json())
            .then(snippets => {
                snippetList.innerHTML = '<h2>Code Snippets</h2>';
                snippets.forEach(snippet => {
                    const snippetItem = document.createElement('div');
                    snippetItem.classList.add('snippet-item');
                    snippetItem.innerHTML = `
                        <h3>${snippet.title}</h3>
                        <pre><code>${snippet.code}</code></pre>
                    `;
                    snippetList.appendChild(snippetItem);
                });
            })
            .catch(error => console.error('Error fetching snippets:', error));
    }

    function addSnippet(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const code = document.getElementById('code').value;

        fetch('http://localhost:3001/api/snippets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, code }),
        })
            .then(response => response.json())
            .then(() => renderSnippets())
            .catch(error => console.error('Error adding snippet:', error));

        addSnippetForm.reset();
    }

    addSnippetForm.addEventListener('submit', addSnippet);

    renderSnippets();
});
