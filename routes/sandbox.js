var express=require('express');
var shortid=require('shortid');

var router = express.Router();
GLOBAL.names=[];

router.post('/test', function(req, res, next) {
	var jsonRes=req.body;
	jsonRes.uid=shortid.generate();
	names.push(jsonRes);
	console.log("Names:");
	console.log(names);
	
});
//TODO: Understand the requirements properly
router.put('/:uid',function(req,res,next) {
	var requid=req.params.uid;
    for(var i in names)
    {
    	if(names[i].uid==requid)
    	{
    		names[i].doj="20 Aug 2015";
    		break;
    	}
    }
    console.log(names);
})
router.get('/:uid',function(req,res,next){
	var requid=req.params.uid;
	 for(var i in names)
    {
    	if(names[i].uid==requid)
    	{
    		res.send(names[i]);
    		break;
    	}
    }
})
router.delete('/:uid',function(req,res,next){
	console.log("in delete")
	var requid=req.params.uid;
	 names.splice(requid,1);
	 console.log(names);
})
module.exports = router;