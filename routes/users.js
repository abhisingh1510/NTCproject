var express = require('express');
var path=require('path')
var usersmodel = require('../models/usersmodel');
var router = express.Router();

/* GET users listing. */
router.use(function(req,res,next){
	if(req.session.emp_no==undefined || req.session.role!='user')
	{
		console.log('Invalid user please login first')
		res.redirect('/logout')
	}
	next()
})

var data_gb_cat
usersmodel.fetchalldata('employee_classification',function(result){
	data_gb_cat=result
})


router.get('/about', function(req, res, next) {
  res.render('usersabout');
});

router.get('/contact', function(req, res, next) {
  res.render('userscontact');
});

router.get('/myaccount',function(req,res,next){
	usersmodel.myaccount('register',req.session.emp_no,function(result){
		if(result)
			res.render('myaccount',{'data':result})
		else
			res.render('myaccount',{'data':result})
	})
})

router.all('/updateaccount',function(req,res,next){
	if(req.method=='GET')
		res.render('updateaccount',{'result':''})
	else
	{
		var data=req.body
		var image=req.files.photo
		var photo
		if(image==null)
		{
			photo='userdummy.png'
			usersmodel.updateaccount('register',data,photo,req.session.emp_no,function(result){
				
				if(result)
					res.render('updateaccount',{'result':'Updated Successfully','data':data_gb_cat})
				else
					res.render('updateaccount',{'result':'Updation Failed','data':data_gb_cat})
								
			}) 
		}
		else
		{
			photo=image.name
			var des	
			des=path.join(__dirname,'../public/uploads',photo)
			image.mv(des)
			usersmodel.updateaccount('register',data,photo,req.session.emp_no,function(result){
				if(result)
						res.render('updateaccount',{'result':'Updated Successfully','data':data_gb_cat})
				else
						res.render('updateaccount',{'result':'Updation Failed','data':data_gb_cat})
							
			})
	 	}
	}
})

router.get('/', function(req, res, next) {
  res.render('usershome')
});

module.exports = router;
