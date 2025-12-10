import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  
  showSuccess = false;

  onSubmit() {
    // TODO: Connect to your backend API here
    console.log('Form submitted:', this.formData);
    
    // Show success message
    this.showSuccess = true;
    
    // Reset form
    this.formData = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      this.showSuccess = false;
    }, 5000);
  }
}