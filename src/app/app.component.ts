import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { PostsFilterService } from './posts-filter.service';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly areSelectedPostsValid$: Observable<boolean>;

  constructor(
    public postsService: PostsService,
    private postFilterService: PostsFilterService
  ) {
    this.areSelectedPostsValid$ = this.setupAreSelectedPostsValid(
      this.postsService.selectedPosts$,
      this.postFilterService.filterPattern$
    );
    this.postFilterService.setFilterPattern('test');
    setTimeout(() => {
      this.postsService.selectPosts(['test', 'other']);
    }, 2000);
  }

  setupAreSelectedPostsValid(
    selectedPosts: Observable<Array<string>>,
    filterPattern$: Observable<string>
  ): Observable<boolean> {
    return selectedPosts.pipe(
      tap((posts) => console.log(posts)),
      withLatestFrom(filterPattern$),
      map(([selectedPosts, filterPattern]) =>
        selectedPosts.reduce(
          (isValid, post) => isValid && post.includes(filterPattern),
          true as boolean
        )
      )
    );
  }
}
