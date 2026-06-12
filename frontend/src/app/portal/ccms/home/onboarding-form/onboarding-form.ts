import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-form',
  standalone: false,
  templateUrl: './onboarding-form.html',
  styleUrl: './onboarding-form.scss',
})
export class OnboardingForm implements OnInit {

  data: any[] = [];  // ← fix 1: initialize as array

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:5000/master/onboardingDepts').subscribe({
      next: (res) => {
        this.data = [...res];  // ← spread operator se reassign karo
        this.cdr.detectChanges();  // ← ye add karo
        console.log('Length:', this.data.length);
      },
      error: (err) => console.error(err)
    });
  }
}