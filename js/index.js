// document.addEventListener("DOMContentLoaded", function() {});
fetch('http://localhost:3000/books')
.then(function(res) {
    return res.json()
})
.then(function(books) {
    for(const book of books) {
        addBook(book)
    }
})

function addBook(book) {
    const ul = document.querySelector('#list')   

    const li = document.createElement('li')
    li.innerHTML = book.title
    li.addEventListener('click', function(e) {
        e.preventDefault()
        showBook(book)
    })

    ul.append(li)
}

function showBook(book) {
    const div = document.querySelector('#show-panel')
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }
    const self = {'id': 1, 'username':'pouros'}
    const img = document.createElement('img')
    img.setAttribute('src', book.img_url)

    const title = document.createElement('h5')
    title.innerHTML = book.title
        
    const subtitle = document.createElement('h5')
    subtitle.innerHTML = book.subtitle

    const author = document.createElement('h5')
    author.innerHTML = book.author

    const description = document.createElement('p')
    description.innerHTML = book.description

    const ul = document.createElement('ul')

    const users = book.users

    for(let i = 0; i < users.length; i++) {
        let user = document.createElement('li')
        user.innerHTML = users[i].username
        ul.append(user)
    }

    const br = document.createElement('br')

    const button = document.createElement('button')
    addText(button, users)
    button.addEventListener('click', function(e) {
        e.preventDefault()
        if (e.target.innerHTML == 'LIKE') {
            addLike(e.target, book, users, self)
        } else {
            removeLike(e.target, book, users, self)
        }
    })

    div.append(img, title, subtitle, author, description, ul, br, button)
}

//Add like to database
function addLike(button, book, users, self) {
    users.push(self)
fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
    },
    body: JSON.stringify({
        users: users
    })
})
.then(function(res) {
    return res.json()
})
.then(function(newBook) {
    addText(button, newBook.users)
    showBook(newBook)
})
}

//Add text to button based on username's presence in DB
function addText(button, users) {
    let usernames = []
    for(let i = 0; i < users.length; i++) {
        usernames.push(users[i].username)
    }
    if (usernames.includes('pouros')) {
        button.innerHTML = 'UNLIKE'
    } else {
        button.innerHTML = 'LIKE'
    }
}

//Remove name from page
function removeLike(button, book, users) {
    users.pop()
fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
    },
    body: JSON.stringify({
        users: users
    })
})
.then(function(res) {
    return res.json()
})
.then(function(newBook) {
    addText(button, newBook.users)
    showBook(newBook)
})
}