import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  formData = {
    fullName: '',
    age: null,
    email: '',
    phone: '',
    program: '',
    experience: '',
    additionalInfo: ''
  };
  
  showSuccess = false;

  onSubmit() {
    // TODO: Connect to your backend API here
    console.log('Registration submitted:', this.formData);
    
    // Show success message
    this.showSuccess = true;
    
    // Scroll to success message
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    
    // Reset form
    this.formData = {
      fullName: '',
      age: null,
      email: '',
      phone: '',
      program: '',
      experience: '',
      additionalInfo: ''
    };
  }
}