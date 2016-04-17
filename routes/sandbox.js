var express=require('express');
var shortid=require('shortid');

var router = express.Router();
GLOBAL.objects=[];

router.post('/objects', function(req, res, next) {
	var newObj=req.body;
	newObj.uid=shortid.generate();
	objects.push(newObj);
	res.send(newObj);
});
router.put('/objects/:uid',function(req,res,next) {
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
router.get('/objects/:uid',function(req,res,next){
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
router.get('/objects',function(req,res,next){
    var objList=[];
    for(var i in objects)
    {
        objList[i]=objects[i].uid;
    }
    res.send(objList);
})
router.delete('/objects/:uid',function(req,res,next){
	var requid=req.params.uid;
    console.log(requid);
	 objects.splice(requid,1);
     console.log(objects);
})
module.exports = router;