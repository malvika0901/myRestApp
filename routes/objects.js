var express=require('express');
var shortid=require('shortid');

var router = express.Router();
//global list of objects 
GLOBAL.objects=[];
//POST route
router.post('/', function(req, res, next) {
	 
    var newObj=req.body;
    var requestType=req.get('Content-Type');
   

	newObj.uid=shortid.generate();
	objects.push(newObj);
	res.send(newObj);

});
//PUT route
router.put('/:uid',function(req,res,next) {
	var requid=req.params.uid;
    var reqbody=req.body;
    for(var i in objects)
    {
    	if(objects[i].uid==requid)
    	{
    		objects[i]=reqbody;
            res.send(objects[i]);
            break;
    	}
    }
})
//GET route to get the details of a particular user
router.get('/:uid',function(req,res,next){
	var requid=req.params.uid;
	 for(var i in objects)
    {
    	if(objects[i].uid==requid)
    	{
    		res.send(objects[i]);
    		break;
    	}
    }
})
//GET route to get the details of all users
router.get('/',function(req,res,next){
    var objList=[];
    for(var i in objects)
    {
        objList[i]=objects[i].uid;
    }
    res.send(objList);
})
//DELETE route to delete the details of a particular user
router.delete('/:uid',function(req,res,next){
	var requid=req.params.uid;
    var indexToDelete;
    for(var i in objects)
    {
        if(objects[i].uid==requid)
        {
            indexToDelete=i;
            objects.splice(indexToDelete,1);

            break;
        }
    }
 })
module.exports = router;