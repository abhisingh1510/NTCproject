var express = require('express');
var mymail=require('mymail')
var path=require('path')
var usersmodel = require('../models/usersmodel');
var router = express.Router();
/*
var data_gb
usersmodel.fetchalldata('addcat',function(result){
	data_gb=result;
})

var data_gb_sub
usersmodel.fetchalldata('addsubcat',function(result){
	data_gb_sub=result;
})
*/
var data_gb_cat
usersmodel.fetchalldata('employee_classification',function(result){
	data_gb_cat=result
})
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index')
});


router.all('/logout',function(req,res,next){
	req.session.destroy()
	res.redirect('login')
})
/*
router.get('/addpost', function(req, res, next) {
		res.render('addpost',{'result':'','mycat':data_gb_sub})
})

router.all('/addpost',function(req,res,next){
	if(req.method=='GET')
    	res.render('addpost',{'result':''});
  	else
  	{
		var data=req.body
		var image1,image2,image3
		var myimg1=req.files.myimg1
		var myimg2=req.files.myimg2
		var myimg3=req.files.myimg3
		var des
		//myimg.mv(des,function(err)
		if(myimg1==null)
		{
			image1="dummy.png"
		}
		else
		{
			image1=myimg1.name
			des=path.join(__dirname,'../public/uploads',image1)
			myimg1.mv(des)
		}	
		if(myimg2==null)
		{
			image2="dummy.png"
		}
		else
		{
			image2=myimg2.name
			des=path.join(__dirname,'../public/uploads',image2)
			myimg2.mv(des)	
		}
		if(myimg3==null)
		{
			image3="dummy.png"
		}
		else
		{
			image3=myimg3.name
			des=path.join(__dirname,'../public/uploads',image3)
			myimg3.mv(des)
		} 	
	   	usersmodel.addpost('postadd',data,image1,image2,image3,function(result){
			if(result)
			{
				res.render('register',{'result':'Post Added Successfully..'})		
			}	  
			else
				res.render('register',{'result':'Post Addition Failed..'})
		}) 
	}  
})

router.get('/viewsubcat/:catnm', function(req, res, next) {
	catnm=req.params.catnm
	usersmodel.fetchsubcat('addsubcat',catnm,function(result){
		res.render('viewsubcat',{'mycat':result,'cat':data_gb});
	})
});
*/
router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/service', function(req, res, next) {
  res.render('service');
});

router.all('/login',function(req,res,next){
	if(req.method=='GET')
		res.render('login',{'result':''})
	else
	{
		var data=req.body
		usersmodel.logincheck('register',data,function(result){
			if(result.length==0)
				res.render('login',{'result':'Login Failed'})
			else
			{
				req.session.emp_no=result[0].emp_no
		  		req.session.role=result[0].role
			  if(result[0].role=="admin")
				  res.redirect('/admin')
			  else
				  res.redirect('/users')
			}
		})
		
	}
})
/*
router.all('/login', function(req, res, next) {
  if(req.method=='GET')
	  res.render('login',{'result':''})
  else
  {
	  var data=req.body
	  usersmodel.logincheck('register',data,function(result){
		  //console.log(result)
		  if(result.length==0)
			  res.render('login',{'result':'Login Failed'})
		  else
		  {
			if(result[0].designation=="admin")
				res.redirect('/admin')
			else
				res.redirect('/users')
		  }
	  })
  }
});
*/
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
/*
router.get('/loginauthentication/:emailid',function(req,res,next){
	emailid=req.params.emailid
	usersmodel.authenticationupdate(emailid,function(result){
		if(result)
			res.redirect('login')
		else
			res.redirect('register')
	})
})
*/
//router.get
module.exports = router;
