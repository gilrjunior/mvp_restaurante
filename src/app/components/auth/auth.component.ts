import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanActivate, Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  public user_email = ''
  public user_password = ''
  public login_status:Boolean = true

  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit(): void {
    
    if(this.auth.authenticated()){
      this.router.navigate(['']);
    }

  }

  async auth_user(){

    const user:User = {
      email: this.user_email,
      password: this.user_password
    }

    if(this.login_status){
      await this.auth.login(user).subscribe({next: (response) => {

        var message = response.body?.message;
        var token = response.body?.token;
  
        if(token){
          this.auth.setToken(token);
        }
  
        this.router.navigate(['']);
  
      }, error: (response) => {
  
        alert(response.error.message);
  
      }});
    }else{
      await this.auth.register(user).subscribe({next: (response) => {

        var message = response.body?.message;
        this.user_email = ''
        this.user_password = ''
        this.login_status = !this.login_status
        this.router.navigate(['login']);
        alert(message)
  
      }, error: (response) => {
  
        alert(response.error.message);
  
      }});
    }

  }

  register(){

    this.login_status = !this.login_status

  }

}
