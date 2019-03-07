import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut, expand } from '../animations/app.animation';

import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  }, animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
  
  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  submitted = null;
  showForm = true;

  formErrors = {
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  };

  validationMessages = {
    'firstname': {
      'required':'First name is required.',
      'minlength': 'First name must be at least 2 characters',
      'maxlength': 'First name must be at most 25 characters'
    },
    'lastname': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters',
      'maxlength': 'Last name must be at most 25 characters'
    },
    'telnum':{
      'required': 'Tel num is required.',
      'pattern': 'Telephone number must be only numbers'
    },
    'email':{
      'required': 'Email is required.',
      'email': 'Email is not in valid format'
    }
  };

  constructor(private fb: FormBuilder, private feedbackservice: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['',[ Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //reset form validation messages
  }

  onValueChanged(data?: any){
    if (!this.feedbackForm){ return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        // clear previous error message if any
        this.formErrors[field] = '';
        const control = form.get(field);
        
        if (control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          
          for (const key in control.errors){
            if (control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + '.';
            }
          }
        }
      }
    }
  }


  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.showForm = false;
    this.feedbackservice.submitFeedback(this.feedback)
    .subscribe(feedback =>{
      this.submitted = feedback;
      this.feedback = null;
      setTimeout(()=>{this.submitted = null; this.showForm = true;}, 5000);
    }, error => console.log(error.status, error.message));


    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email:'',
      agree: false,
      contacttype: 'None',
      message:''
    });

    this.feedbackFormDirective.resetForm();

      
  }

}