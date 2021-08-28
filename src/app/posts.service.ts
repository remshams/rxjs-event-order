import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService implements OnDestroy {
  private readonly destroy = new ReplaySubject<void>(1);
  private readonly posts = new BehaviorSubject<Array<string>>([
    'test',
    'other',
    'values',
    'next',
  ]);
  private readonly selectedPosts = new BehaviorSubject<Array<string>>([]);
  private readonly selectPostsSubject = new Subject<Array<string>>();

  readonly posts$: Observable<Array<string>>;
  readonly selectedPosts$: Observable<Array<string>>;

  constructor() {
    this.posts$ = this.posts.asObservable();
    this.selectedPosts$ = this.selectedPosts.asObservable();

    this.setupSelectedPosts(
      this.selectPostsSubject.asObservable(),
      this.posts$
    );
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  selectPosts(selectedPosts: Array<string>) {
    console.log(selectedPosts, 'PostsService Selection');
    this.selectPostsSubject.next(selectedPosts);
  }

  setupSelectedPosts(
    newSelectedPosts$: Observable<Array<string>>,
    posts$: Observable<Array<string>>
  ) {
    newSelectedPosts$
      .pipe(
        withLatestFrom(posts$),
        map(([newSelectedPosts, posts]) =>
          newSelectedPosts.filter((post) => posts.includes(post))
        ),
        takeUntil(this.destroy)
      )
      .subscribe((newSelectedPosts) =>
        this.selectedPosts.next(newSelectedPosts)
      );
  }
}
