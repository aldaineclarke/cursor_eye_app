import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data = {
  email: '',
  password: '',
  // rememberMe: null
 };

 loginError = false; // Flag to track if there's a login error


// >> Initialize showForgotPasswordModal variable <<
// showForgotPasswordModal: boolean = false;

// openForgotPasswordModal() {
//   this.showForgotPasswordModal = true;
// }

// closeForgotPasswordModal() {
//   this.showForgotPasswordModal = false;
// }
// >>>>>>>>>>>>>>>>>>>>>>>>>>>


constructor(private userService: UserService, private router: Router) { }

 ngOnInit(): void {}


 onInputChange() {
  this.loginError = false; // Reset login error on input change
 }
   

 onSubmit(form: NgForm) {

  if(form.invalid) {
    return; // Exit if form is invalid
  }

  this.loginError = false; // Reset the error flag on each login attempt

  this.userService.login(this.data).subscribe({
    next: (res) => {
      console.log(res)
    if (res.status !== 'error') {
      this.router.navigateByUrl('/settings')
      this.loginError = true; // Set loginError to true to display error message
    }
  }
  });
 }
}
