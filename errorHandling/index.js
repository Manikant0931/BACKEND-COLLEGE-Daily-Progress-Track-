const express=require('express');

const fs=require('fs');
const app=express();
app.use(express.urlencoded({extended:true}));

const errorHandler=require('./middleware/error');
const path = require('path');
const users=require('../users_400.json');
const { json } = require('stream/consumers');



app.get('/',(req,res)=>{
    res.send("welcome to our website");
});

app.get('/users',(req,res)=>{  
    return res.json(users);  
});

app.get('/data',(req,res)=>{
    const html=`
    <ul>
        ${users.map(user=>`<li>${user.name}</li>`).join(' ')}
    </ul>
    `;
    res.send(html);
});
app.get('/api/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(u =>u.id===id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.json(user);
});


// app.post=>no id required
app.post('/users',(req,res)=>{
    //will do this in mongodb

    //using fs to write data in json file
    const newData= {
        "id": 401,
        "name": "ManiMishra",
        "email": "mani1@example.com",
        "address": {
            "street": "135 rqulsw Street",
            "city": "City_axci",
            "state": "State_sda",
            "pincode": 927809
        },
        "contact": {
            "phone": "3071672888",
            "alternate_phone": "8919567629"
        }
    }
    fs.readFile('../users_400.json','utf-8',(err,data)=>{
        if(err) return res.status(500).json({message:"Read error"});
        const allUsers = JSON.parse(data);
        allUsers.push(newData);
        fs.writeFile('../users_400.json', JSON.stringify(allUsers,null,2), (err)=>{
            if(err) return res.status(500).json({message:"Write error"});

            res.json({message:"User created successfully"});
        });
    });
});


// app.patch=>id
app.patch('/api/users/:id',(req,res)=>{
    //will do this in mongodb or in postman
    res.json({message:"User updated successfully"});
});

// app.delete=>id
app.delete('/api/users/:id',(req,res)=>{
    //will do this in mongodb or in postman
    res.json({message:"User deleted successfully"});
});
// app.put=>id
app.put('/api/users/:id',(req,res)=>{
    //will do this in mongodb or in postman
    res.json({message:"User updated successfully"});
}
);


// app.post('/api/users',(req,res)=>{
//         const data=req.body;
//         console.log(data);
//         return res.json({message:"User created successfully"});
// })


app.post('/api/users',(req,res)=>{
    const data=req.body;
    fs.writeFile("users json");
    json.stringify(data);
    return res.json({message:"Data received successfully"});
}
)

// error handling (optional enable later)
// app.use((req,res,next)=>{
//     const error=new Error("Page not found");
//     error.statusCode=404;
//     error.status="Fail";
//     next(error);
// });
// app.use(errorHandler);

app.listen(6000,()=>{
    console.log("app is running at http://localhost:6000");
});