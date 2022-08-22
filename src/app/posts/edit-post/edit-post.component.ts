import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/modals/post.modal';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../state/posts.actions';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  updatePostForm: FormGroup;
  post: Post;
  postSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      const id = params.get('id');
      this.postSubscription = this.store
        .select(getPostById, { id })
        .subscribe((data) => {
          this.post = data;
          // console.log(this.post);
          this.createForm();
        });
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  createForm() {
    this.updatePostForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  showTitleError() {
    const title = this.updatePostForm?.get('title');
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
    const description = this.updatePostForm?.get('description');
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

  onUpdatePostForm() {
    if (this.updatePostForm.invalid) {
      return;
    }
    console.log(this.updatePostForm.value);
    const title = this.updatePostForm.value.title;
    const description = this.updatePostForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description,
    }

    this.store.dispatch(updatePost({post}))
    this.router.navigate(['posts'])
  }
}
