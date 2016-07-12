let Router = require('express').Router;
const apiRouter = Router()

let User = require('../db/schema.js').User
let Drawing = require('../db/schema.js').Drawing


apiRouter.get('/users', function(req, res){
  User.find({}, function(err, results){
    res.json(results)
  })
})

// //read many
// apiRouter.get('/posts/', function(req, res){
//   Post.find(req.query, function(err, results){
//     res.json(results)
//   })
// })

//read many for drawings

apiRouter.get('/drawing', function(req, res){
  Drawing.find({}, function(err, results){
    res.json(results)
  })
})
// //read one
// apiRouter.get('/posts/:_id', function(req, res){
//   Post.findOne(req.params, function(err, result){
//     res.json(result)
//   })
// })

// //create one
// apiRouter.post('/posts', function(req, res){
//   let newPost = new Post(req.body)
//   newPost.save(function(err){
//     if(err) return res.json({message: 'error saving'})
//       res.json(newPost)
//   })
// })

//create one for Drawing

apiRouter.post('/drawing', function(req, res){
  let newDrawing = new Drawing(req.body)
  newDrawing.save(function(err){
    if(err) {res.json({message: 'error saving'})}
    else {
      res.json(newDrawing)
    }
  })
})

// //update one
// apiRouter.put('/posts/:_id', function(req,res) {
//   Post.findOne(req.params, function(err,record) {
//     for (var prop in req.body) {
//       record[prop] = req.body[prop]
//     }
//     record.save(function(err){
//       if(err) return res.json({message: 'error saving'})
//       res.json(record)
//     })
//   })
// })

//delete one
apiRouter.delete('/posts/:_id', (req,res) => {
  Post.remove(req.params,(err) => {
    res.status(204).json({msg: "record successfully deleted",
      _id: req.params._id})
  })
})

module.exports = apiRouter