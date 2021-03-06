import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private cs:CommonService) { }

  ngOnInit() {
    setTimeout(() => {
     this.cs.logout() 
    },0);
  }
  submitForm(obj)
  {
    console.log(obj)
    if(obj.role=="ADMIN")
    {
    if(obj.id!=="admin")
    {
      alert("invalid username");
    }
    else if(obj.password!=="admin")
    {
      alert("invalid password")
    }
    else
    {
      alert("login successfully")
      this.cs.loggedinStatus=true
      this.router.navigate(['/adminprofile'])
    }
  }
  else if(obj.role=="student")
  {
    this.cs.studentLogin(obj).subscribe((res)=>
    {
      if (res["message"]=="invalid-studentid")
      {
        alert("invalid student id")
      }
      else if(res["message"]=="invalid-password")
      {
        alert("invalid-password")
      }
      else
      {
        alert("loggedin successfully")
        this.cs.loggedinUser=res["name"]
        this.cs.loggedinStatus=true;
        console.log(res["name"])
        this.router.navigate(['/studentprofile']);
      }
    })
  }
  else{
    alert("please select a role")
  }
  }
}
