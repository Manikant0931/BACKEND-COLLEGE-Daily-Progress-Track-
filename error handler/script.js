const express=require('express')
const app=express()
const errorHandler=require('./middleware/errorHAndler')
app.get('/',(req,res)=>{
    res.send("welcome to HomePage");
})


app.use((req,res,next)=>{
    const error=new error("Page not found!")
    error.statusCode=404;
    error.status="Fail";
    next(error);
})
app.use(errorHandler)

app.listen(4000,()=>{
    console.log("app is runnning on the port 4000 at http://localhost:4000");
})

//type of error:
// 1.operation error
// 2.programming error

//operation error: it is an error that occurs during the execution of a program. 
// it is caused by external factors such as user input, network failure, 
// or database connection failure. 
// it can be handled by using try-catch block or 
// by using error handling middleware in express.

//programming error: it is an error that occurs due to a bug in the code.
// it is caused by a mistake in the code such as syntax error, 
// logical error, or runtime error. 
// it can be handled by using try-catch block or 
// by using error handling middleware in express.