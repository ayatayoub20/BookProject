var generator = require('../util/genroter');
var memStorage = require('../util/memory.storage');
var model = require('../Model/note.model');

exports.getlAllNotes = (req,res)=>{
    // var seqId = generator.generate(); 
    // memStorage.store.setItem(seqId,"first value");

    // var keys = memStorage.getKeys(memStorage.store);
    // var values = memStorage.getValues(memStorage.store);

    // var Note = model.Note;
    // var noteObj = new Note(seqId , "a","b","ayat",new Date())

//    res.send('get all notes .....keys'+ JSON.stringify(noteObj)+ JSON.stringify(values));
      var values = memStorage.getValues(memStorage.store);
      console.log('values'+ JSON.stringify(values));
      return res.status(200).send(JSON.stringify(values));
}

exports.saveNotes = (req,res)=>{
  var seqId = generator.generate(); 
  var createdBy = "ayat";
  var createnOn = new Date();  

  //req body
  var title= req.body.title;
  var content= req.body.content;
    if (!title || !content) {
       return res.status(500).send({ error: 'content and title should not be empty' })
    }
    var Note = model.Note;
    var noteObj = new Note(seqId , title,content,createdBy,createnOn)
    memStorage.store.setItem(seqId,noteObj);
   return res.status(201).send(' Successfuly note saved');
 }

 exports.updateNotes = (req,res)=>{
  var createdBy = "ayat";
  var createnOn = new Date();  
  //req body
  var noteId= req.body.noteId;
  var title= req.body.title;
  var content= req.body.content;
  if ( !noteId) {
    return res.status(500).send({ error: 'note id should not be empty' })
 }
    if (!title || !content) {
       return res.status(500).send({ error: 'content and title should not be empty' })
    }
    var noteItem =  memStorage.store.getItem(noteId);
    if (!noteItem) {
        return res.status(500).send({ error: 'note id is not exist' })
    }
    var Note = model.Note;
    var noteObj = new Note(noteId , title,content,createdBy,createnOn)
    memStorage.store.setItem(noteId,noteObj);
   return res.status(200).send(' Successfuly note updated');
 }

 exports.deleteNotes = (req,res)=>{
    var noteId = req.params.noteId;
    if ( !noteId) {
        return res.status(500).send({ error: 'can not delete empty noteId' })
     }
     var noteItem =  memStorage.store.getItem(noteId);
    if (!noteItem) {
        return res.status(500).send({ error: 'note id is not exist' })
    }
    memStorage.store.removeItem(noteId);
    return res.status(200).send(' Successfuly note deleted');
 }

 
