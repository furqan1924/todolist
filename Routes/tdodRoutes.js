const express = require('express');
const router = express.Router();

// Array for to Store To do items 

const data = [];


// error hendling Middleware

router.use((err,req,res,next)=>{
  res.status((500).json({msg:"Internal Server error"}));
});


// get all todos

router.get("todos",(req,res)=>{
  res.json(data);
})

// Delete Route
router.delete("todos/:id",(req, res)=>{

  const todoId = req.params.id;
  const TodoIndex = data.findIndex((todos) => todos.id === todoId );
  if(TodoIndex === -1){
    res.status(404).json({msg:"Todo item not Found"})
  
  }else{
    data.splice(TodoIndex,1);
    res.status(200).json({msg:"Todo Item Deleted"});
  }

})


// input validation middleware
router.use((req,res,next)=>{
  const {title , des} = req.body;
  if(!title || typeof title !== 'string'|| !des ||typeof des !== 'string' ){
    res.status(400).json({err:"Please Insert valid title and Description"});
  }else{
    next();
  }
})

// Add todo items route
router.post("todos",(req , res)=>{
  const {id,title , des} = req.body;
  const newitems = {id, title , des};
  data.push(newitems);
  res.status(200).json({success:"Added"});
})

// Route for update
router.put("todos/:id",(req , res)=>{
  const todoId = req.params.id;
  const findTodoItem = data.find((todos) => todos.id === todoId );
  if(findTodoItem){
   findTodoItem.title = req.body.title || findTodoItem.title;
   findTodoItem.des = req.body.des  || findTodoItem.des;
   res.status(200).json({success:"Updated!" , data: findTodoItem.data});
  }else{
    res.status(404).json({msg:"Todo item not Found"});
  }

})

module.export = router;