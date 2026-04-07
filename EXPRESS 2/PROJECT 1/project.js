const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

let users = [
    { id: "1", name: "Aditya Gupta", email: "aditya@gmail.com", age: "22" },
    { id: "2", name: "Vanshita Jaiswal", email: "vanshita@gmail.com", age: "21" },
    { id: "3", name: "Sachin Yadav", email: "sachin@gmail.com", age: "22" }
];

app.get("/", (req, res) => {

    let rows = "";

    for (let i = 0; i < users.length; i++) {
        rows += `
        <tr>
            <td>${users[i].id}</td>
            <td>${users[i].name}</td>
            <td>${users[i].email}</td>
            <td>${users[i].age}</td>
            <td>
                <form action="/delete" method="post">
                    <input type="hidden" name="id" value="${users[i].id}">
                    <button type="submit">Delete</button>
                </form>
            </td>
        </tr>
        `;
    }

    res.send(`
    <html>
    <body>
        <h1>User System</h1>

        <table border="1">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Delete</th>
            </tr>
            ${rows}
        </table>

        <h2>Add User</h2>
        <form action="/" method="post">
            <input type="text" name="id" placeholder="Id" required>
            <input type="text" name="name" placeholder="Name" required>
            <input type="text" name="email" placeholder="Email" required>
            <input type="text" name="age" placeholder="Age" required>
            <button type="submit">Add</button>
        </form>

        <h2>Update User</h2>
        <form action="/update" method="post">
            <input type="text" name="id" placeholder="Id" required>
            <input type="text" name="name" placeholder="New Name">
            <input type="text" name="email" placeholder="New Email">
            <input type="text" name="age" placeholder="New Age">
            <button type="submit">Update</button>
        </form>

    </body>
    </html>
    `);
});

app.post("/", (req, res) => {
    users.push(req.body);
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    users = users.filter(user => user.id !== req.body.id);
    res.redirect("/");
});

app.post("/update", (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === req.body.id) {
            if (req.body.name) users[i].name = req.body.name;
            if (req.body.email) users[i].email = req.body.email;
            if (req.body.age) users[i].age = req.body.age;
        }
    }
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
