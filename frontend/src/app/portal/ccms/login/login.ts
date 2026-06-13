import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../config'
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {

  showPassword: boolean = false;
  email: string = '';
  password: string = '';
  errors: any = {};
  image_path: any;

  private baseUrl = 'https://ccms-nck9.onrender.com'
  // private baseUrl = 'http://localhost:5000'

  constructor(private http: HttpClient, private router: Router) {

  }
  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    this.http.post<any>(`${this.baseUrl}/login`, credentials).subscribe({
      next: (response) => {
        localStorage.setItem('fullname', response.fullname);
        localStorage.setItem('email', response.email);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('stateId', response.stateId);
        localStorage.setItem('deptId', response.deptId);
        localStorage.setItem('status', response.status);
        localStorage.setItem('roleType', response.roleType);
        localStorage.setItem('distCode', response.dist_code);

        this.router.navigate(['/portal/ccms/adminHome'])
      }
    })

  }
}




