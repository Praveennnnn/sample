import express, { query } from 'express'
import mysql, { createConnection } from 'mysql'
import cors from 'cors'
import path from 'path';

const __dirname=path.resolve()

const app=express();``
app.use(cors());
app.use(express.json());

const dp=mysql.createConnection({
    host:'172.16.44.6',
    user:'root',
    password:'swift',
    database:'curd'
})
app.get('/default',(req,res)=>{
    const sql="SELECT* FROM student";
    dp.query(sql, (err, result)=> {
        if(err) return res.json({message:"Error da daii"});
        return res.json(result);
    })
})

app.post('/student',(req,res)=>{
    console.log(req.body);
    
    const sql="INSERT INTO student(name,Email) VALUES(?)";
    const values=[
        req.body.name, 
        req.body.Email
    ]
    dp.query(sql,[values],(err ,result)=> {
        if(err) return res.json(err);
        return res.json(result);
    })
})
app.get('/Read/:id',(req,res)=>{
    const sql="SELECT* FROM student WHERE id= ?";
    const id=req.params.id;
    
    dp.query(sql,[id],(err, result)=> {
        if(err) return res.json({message:"Error da daii"});
        return res.json(result);
    })
})

app.put('/Edit/',(req,res)=>{
    const sql='UPDATE student SET name =?, Email =? WHERE id=?';
    console.log(req.body);
    
    dp.query(sql,[req.body.name,req.body.Email,req.body.id],(err,result)=>{
        if(err) return res.json({message:"Error da daii"});
        console.log(result);
        
        return res.json(result);
        
    })
})

app.delete('/Delect/:id',(req,res)=>{
    const sql='DELETE FROM student WHERE  id=?';
    const id=req.params.id;

    dp.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Error da daii"});
        return res.json(result);
        
    })

})

app.use(express.static(path.join(__dirname, 'build')));
app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"build","index.html"))
})

app.listen(8045,()=>{
    console.log("hello praveen",8081)
})          