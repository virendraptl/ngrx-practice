import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/modals/post.modal';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  showTitleError() {
    const title = this.postForm.get('title');
    if (title.touched && title.invalid) {
      if (title.getError('required')) {
        return 'Title is required';
      }
      if (title.getError('minlength')) {
        return 'Min 6 characters are required';
      }
    }
    return null;
  }

  showDescriptionError() {
    const description = this.postForm.get('description');
    if (description.touched && description.invalid) {
      if (description.getError('required')) {
        return 'Description is required';
      }
      if (description.getError('minlength')) {
        return 'Min 10 characters are required';
      }
    }
    return null;
  }

  addPostForm() {
    if (this.postForm.invalid) {
      return;
    }
    console.log(this.postForm.value);
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };

    this.store.dispatch(addPost({ post }));
  }
}
