const booksURL = "http://localhost:3000/books";
document.addEventListener("DOMContentLoaded", function () {
    getBooks();
});


function getBooks() {
    fetch(booksURL)
        .then(res => res.json())
        .then(books => {
            books.forEach(book => {
                renderList(book);
            })
        })
}

function renderList(book) {
    const list = document.getElementById("list")
    const listItem = document.createElement("li")
    listItem.innerText = book.title
    listItem.addEventListener("click", (e) => {
        renderBook(book);
    })
    list.append(listItem)
}

function renderBook(book) {

    const image = document.createElement("img")
    image.src = book.img_url

    const title = document.createElement("h3")
    title.innerText = book.title

    const subTitle = document.createElement("h3")
    subTitle.innerText = book.subtitle

    const author = document.createElement("h3")
    author.innerText = book.author

    const desc = document.createElement("p")
    desc.innerText = book.description

    const userList = document.createElement("ul")
    const users = book.users
    const newUsers = users
    console.log(newUsers)

    const showPanel = document.getElementById("show-panel")
    showPanel.innerHTML = ""

    for (const user of users) {
        const li = document.createElement("li")
        li.innerText = user.username
        userList.append(li)
    }

    const likeBtn = document.createElement("button")
    likeBtn.innerHTML = "Like"
    likeBtn.addEventListener("click", (e) => {
        
        newUsers.push({ "id": 1, "username": "pouros" })
        
        fetch(booksURL + `/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                users: newUsers
            })
        })
            .then(renderBook(book))
    })

    showPanel.append(image, title, subTitle, author, desc, userList, likeBtn)
}
