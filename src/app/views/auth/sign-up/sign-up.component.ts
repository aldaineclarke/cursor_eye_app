import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  // Fields are initiallty empty
  data: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    // confirm_password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  // >> Toggle password visibility <<
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>

  // Function to handle for submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(this.data);
      // Register a user
      this.userService.register(this.data).subscribe({
        next: (res) => {
          // if (res.status !== 'success') {
          //   if (res.statusCode === 429) {
          //     Swal.fire({
          //       title: 'Maximum Attempts Reached',
          //       text: 'You have reached the maximum number of attempts. Please try again in 10 minutes.',
          //       icon: 'error',
          //       confirmButtonText: 'OK',
          //     });
          //   }

          //   if (res.error.email) {
          //     form.controls['email'].setErrors({ unique: res.error.email });
          //   }
          //   return;
          // }

          // Display a toaster on success user creation
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'User created successfully.',
          });

          // Reset the form after submission
          form.resetForm();
          this.router.navigate(['/login']);
        },
      });
    }
  }

  restrictInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const regex = /^[a-zA-Z]*$/; // Allow only letters

    // Check each character against the expression
    for (let i = 0; i < inputValue.length; i++) {
      if (!regex.test(inputValue[i])) {
        inputElement.value = inputValue.slice(0, i) + inputValue.slice(i + 1);
        break;
      }
    }
  }
}
