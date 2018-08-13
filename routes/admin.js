var express = require('express');
var path=require('path')
var usersmodel = require('../models/usersmodel');
var router = express.Router();

router.use(function(req,res,next){
	if(req.session.emp_no==undefined || req.session.role!='admin')
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

var data_gb=""

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('adminhome')
});

router.get('/myaccount',function(req,res,next){
	usersmodel.myaccount('register',req.session.emp_no,function(result){
		if(result)
			res.render('myaccountadmin',{'data':result})
		else
			res.render('myaccountadmin',{'data':result})
	})
})

router.all('/updateaccount',function(req,res,next){
	if(req.method=='GET')
		res.render('updateaccountadmin',{'result':''})
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
					res.render('updateaccountadmin',{'result':'Updated Successfully','data':data_gb_cat})
				else
					res.render('updateaccountadmin',{'result':'Updation Failed','data':data_gb_cat})
								
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
						res.render('updateaccountadmin',{'result':'Updated Successfully','data':data_gb_cat})
				else
						res.render('updateaccountadmin',{'result':'Updation Failed','data':data_gb_cat})
							
			})
	 	}
	}
})

router.get('/contact',function(req,res,next){
	res.render('admincontact')
})

router.all('/attendance',function(req,res,next){
	if(req.method=='GET')
		res.render('attendance',{'result':'','data':data_gb_cat})
	else
	{
		var data=req.body
		usersmodel.attendance('attendance',data,function(result){
			if(result)
				res.render('attendance',{'result':'Attendance Updated Successfully','data':data_gb_cat})
			else
				res.render('attendance',{'result':'Attendance Updation Failed','data':data_gb_cat})
		})
	}
		
})

router.all('/remove',function(req,res,next){
	if(req.method=='GET')
		res.render('remove',{'result':''})
	else
	{
		var data=req.body
		usersmodel.remove('register',data,function(result){
			if(result)
				res.render('remove',{'result':'Employee Removed Successfully'})
			else
				res.render('remove',{'result':'Employee Removal Failed'})
		})
	}
		
})

router.all('/list',function(req,res,next){
	if(req.method=='GET')
		res.render('list',{'result':'','data':data_gb_cat})
	else
	{
		var data=req.body
		var status=1
		if(data.empl_status=="Active")
			status=1
		else
			status=0
		usersmodel.list('register',data,status,function(result){
			if(result)
				res.render('viewlist',{'data':result})
			else
				res.render('viewlist',{'data':result})
		})
	}
		
})

router.all('/wage',function(req,res,next){
	if(req.method=='GET')
		res.render('wage',{'result':'','data':data_gb_cat})
	else
	{
		var data=req.body
		usersmodel.wage('employee_classification',data,function(result){
			if(result)
				res.render('wage',{'result':'Updated Successfully','data':data_gb_cat})
			else
				res.render('wage',{'result':'Update Failed','data':data_gb_cat})
		})
	}
})

router.all('/salaryslip',function(req,res,next){
	if(req.method=='GET')
		res.render('printslip')
	else
	{
		var data=req.body
		usersmodel.slip('salary',data,function(result){
			if(result)
				res.render('pdfgen',{'sal':result})
			else
				res.render('pdfgen',{'sal':result})
		})
	}
})

router.all('/salary',function(req,res,next){
	if(req.method=='GET')
		res.render('salary',{'result':'','data':data_gb_cat})
	else
	{
		var data=req.body
		//data_gb=req.body
		//var emp_no=req.body.emp_no
		//var rd='/admin/salaryslip'
		usersmodel.generatesalary('salary',data,function(result){
			if(result)
				res.render('salary',{'result':'Successful','data':data_gb_cat})
			else
				res.render('salary',{'result':'Unsuccessful','data':data_gb_cat})
		})
	}

})

router.all('/register', function(req, res, next) {
	if(req.method=='GET')
	  res.render('register',{'result':'','data':data_gb_cat});
	else
	{
	 var data=req.body
	 var image=req.files.photo
	 var photo
	 if(image==null)
	 {
		 photo='userdummy.png'
		 usersmodel.userregistration('register',data,photo,function(result){
		  if(result)
		  {
			 if(result)
				 res.render('register',{'result':'Registered Successfully..','data':data_gb_cat})
			 else
				 res.render('register',{'result':'Registered Successfully..','data':data_gb_cat})
		  }
		   
		}) 
	 }
	 else
	 {
	  photo=image.name
		  var des	
	  des=path.join(__dirname,'../public/uploads',photo)
		  image.mv(des)
	  usersmodel.userregistration('register',data,photo,function(result){
		  if(result)
		  {
			  if(result)
				  res.render('register',{'result':'Registered Successfully..','data':data_gb_cat})
			  else
				  res.render('register',{'result':'Registered Successfully..','data':data_gb_cat})
		  }
		  
	  })
	 }
	}  
  });
/*
router.all('/addcategory',function(res,req,next){
	if(req.method=='GET')
		res.render('addcat')
	else
	{
		var data=req.body
		console.log(data)
	}
})
*/
/*
router.all('/addcategory',function(req,res,next){
	if(req.method=='GET')
		res.render('addcat',{'result':''})
	else
	{
		var cat_nm=req.body.cat_nm
		var myimg=req.files.cat_img
		var cat_img_nm=myimg.name
		//Date()+'-'+
		var des=path.join(__dirname,'../public/uploads',cat_img_nm)
		myimg.mv(des,function(err){				//first arguement is destination path
			if(err)
				res.render('addcat',{'result':'Upload Failed'})
			else
			{
				usersmodel.addcategory(cat_nm,cat_img_nm,function(result){
					if(result)
						res.render('addcat',{'result':'Category Added Successfully'})
					else
						res.render('addcat',{'result':'Category Addition Failed'})
				})
			}
		})						
	}
})

router.all('/addsubcategory',function(req,res,next){
	var data={}
	usersmodel.fetchalldata('addcat',function(result){
		data=result;
	})
	
	if(req.method=='GET')
	{
		res.render('addsubcat',{'mycat':data_gb})
	}
	else
	{
		var cat_nm=req.body.cat_nm
		var sub_cat_nm=req.body.sub_cat_nm
		var myimg=req.files.sub_cat_img
		var sub_cat_img_nm=myimg.name
		//Date()+'-'+
		var des=path.join(__dirname,'../public/uploads',sub_cat_img_nm)
		myimg.mv(des,function(err){				//first arguement is destination path
			if(err)
				res.render('addsubcat',{'mycat':data_gb})
			else
			{
				usersmodel.addsubcategory(cat_nm,sub_cat_nm,sub_cat_img_nm,function(result){
					if(result)
						res.render('addsubcat',{'mycat':data_gb})
					else
						res.render('addsubcat',{'mycat':data_gb})
				})
			}
		})						
	}
})
*/
module.exports = router;
