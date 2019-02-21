import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap} from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment'


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  commentForm: FormGroup;
  comment: Comment;
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  @ViewChild('cform') commentFormDirective;

  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at least 2 characters',
      'maxlength': 'Author name can be at most 25 characters'
    },
    'comment': {
      'required': 'comment is required.'
    }
  };


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
     }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params)  => this.dishservice.getDish(+params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: number){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index -1 ) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }

  goBack(): void {
    this.location.back();
  }

  createForm(){
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required]]
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //reset form validationn messages
  }

  onValueChanged(data?: any){
    const form = this.commentForm;
    if (!form) { return };
    
    for (const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
    
        this.formErrors[field] = '';   // clearprevious error  messages if any
        const control = form.get(field)

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

  onSubmit(){
    let date = new Date().toISOString();
    this.comment = this.commentForm.value;
    this.comment.date = date;

    this.dish.comments.push(this.comment);

    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });

    this.commentFormDirective.resetForm(this.commentForm.value);

  }
}
