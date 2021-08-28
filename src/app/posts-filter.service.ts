import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
} from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { PostsService } from './posts.service';
import { isEqualArray } from './utils/primitives';

@Injectable({
  providedIn: 'root',
})
export class PostsFilterService implements OnDestroy {
  private readonly destroy = new ReplaySubject<void>(1);
  private readonly filterPattern = new BehaviorSubject('');

  readonly filterPattern$: Observable<string>;

  constructor(private postsService: PostsService) {
    this.filterPattern$ = this.filterPattern.asObservable();

    this.setupFilteredSelectedPosts(
      this.filterPattern$,
      postsService.selectedPosts$
    );
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  setFilterPattern(filterPattern: string) {
    this.filterPattern.next(filterPattern);
  }

  setupFilteredSelectedPosts(
    filterPattern$: Observable<string>,
    selectedPosts$: Observable<Array<string>>
  ) {
    combineLatest([selectedPosts$, filterPattern$])
      .pipe(
        map(([selectedPosts, filterPattern]) =>
          selectedPosts.filter((post) => post.includes(filterPattern))
        ),
        tap((selectedPosts) => console.log(selectedPosts, 'PostFilterService')),
        distinctUntilChanged((base, compare) => isEqualArray(base, compare)),
        takeUntil(this.destroy)
      )
      .subscribe((posts) => this.postsService.selectPosts(posts));
  }
}
