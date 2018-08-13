var con=require('./conn.js')

function fetchalldata(tbl_nm,cb)
{
	var query="select * from "+tbl_nm
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function userregistration(tbl_nm,data,photo,cb)
{
    var query="insert into "+tbl_nm+" values(NULL,'"+data.emp_no+"','"+data.pass+"','"+data.name+"','"+data.designation+"','"+data.address+"','"+data.contact_no+"','"+data.gender+"','"+data.dob+"','"+photo+"','user',1)"
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)      //result is either true or false
    })
}

function logincheck(tbl_nm,data,cb)
{
	var query="select * from "+tbl_nm+" where emp_no='"+data.emp_no+"' && pass='"+data.pass+"' && status=1"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function remove(tbl_nm,data,cb)
{
	var query="update "+tbl_nm+" set status="+0+" where emp_no='"+data.emp_no+"'"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function myaccount(tbl_nm,data,cb)
{
	var query="select * from "+tbl_nm+" where emp_no='"+data+"'"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function updateaccount(tbl_nm,data,photo,emp_no,cb)
{
	var query="update "+tbl_nm+" set pass='"+data.pass+"', name='"+data.name+"', address='"+data.address+"', contact_no='"+data.contact_no+"', gender='"+data.gender+"', dob='"+data.dob+"', photo='"+photo+"' where emp_no='"+emp_no+"'"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function wage(tbl_nm,data,cb)
{
	var query="update "+tbl_nm+" set payscale='"+data.wage_rate+"' where category='"+data.designation+"'"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function attendance(tbl_nm,data,cb)
{
	var query="insert into "+tbl_nm+" values(NULL,'"+data.emp_no+"','"+data.month+"','"+data.year+"','"+data.present+"','"+data.absent+"','"+data.paid_leave+"','"+data.unpaid_leave+"')"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function slip(tbl_nm,data,cb)
{
	var query="select * from "+tbl_nm+" where emp_no='"+data.emp_no+"' and month='"+data.month+"' and year='"+data.year+"'"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function list(tbl_nm,data,status,cb)
{
	var query="select * from "+tbl_nm+" where designation='"+data.designation+"' and status="+status
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function generatesalary(tbl_nm,data,cb)
{
	
	var designation="select designation from register where emp_no='"+data.emp_no+"'"
	con.query(designation,function(err,result1){
		if(err)
			console.log(err)
		else
		{
			var salary_scale="select payscale from employee_classification where category='"+result1[0].designation+"'"
			con.query(salary_scale,function(err,result2){
			if(err)
				console.log(err)
			else
			{
				var attendance="select present from attendance where emp_no='"+data.emp_no+"' and month='"+data.month+"' and year='"+data.year+"'"
				con.query(attendance,function(err,result3){
				if(err)
					console.log(err)
				else
				{
					
					var paid_leave="select paid_leave from attendance where emp_no='"+data.emp_no+"' and month='"+data.month+"' and year='"+data.year+"'"
					con.query(paid_leave,function(err,result4){
						if(err)
							console.log(err)
						else
						{
							var salary=((result4[0].paid_leave)*1+(result3[0].present)*1)*(result2[0].payscale)
							var query="insert into "+tbl_nm+" values(NULL,'"+data.emp_no+"','"+data.month+"','"+data.year+"','"+salary+"')"
							con.query(query,function(err,result){
								if(err)
									console.log(err)
								else
									cb(result)
							})
						}
					})
				}
				})
			}
			})
		}
	})
}
/*
function addcategory(cat_nm,cat_img_nm,cb)
{
	var query="insert into addcat values (NULL,'"+cat_nm+"','"+cat_img_nm+"')"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})	
}
*/
module.exports={userregistration:userregistration,fetchalldata:fetchalldata,logincheck:logincheck,attendance:attendance,generatesalary:generatesalary,slip:slip,wage:wage,remove:remove,list:list,myaccount:myaccount,updateaccount:updateaccount}