import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  isDarkMode = false;
  contactForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Check if dark mode was previously set in localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      this.isDarkMode = savedMode === 'true';
      this.applyTheme();
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyTheme();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted with data:', this.contactForm.value);
      
      // Reset form after submission
      this.contactForm.reset();
      
      // You could display a success message here
      alert('Thank you for your message! I will get back to you soon.');
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  private applyTheme(): void {
    const contactContainer = document.querySelector('.contact-container');
    if (contactContainer) {
      if (this.isDarkMode) {
        contactContainer.classList.add('dark-mode');
        contactContainer.classList.remove('light-mode');
      } else {
        contactContainer.classList.add('light-mode');
        contactContainer.classList.remove('dark-mode');
      }
    }
  }
}
