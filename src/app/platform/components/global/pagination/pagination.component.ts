import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { BaseModel } from '@platform/modules/http/classes/base.model';
import { PagingResponse } from '@platform/models/paging-response';
import { BaseComponent } from '@platform/helpers/base.component';
import { Unsubscribe } from '@platform/decorators/unsubscribe.decorator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})

export class PaginationComponent extends BaseComponent implements OnInit {

  @Output() itemsChanged = new EventEmitter<any>();
  @Input() activePageInterval: number = 3;
  @Input() getData: (page: number) => Observable<PagingResponse>;
  @Input() items: BaseModel[] = [];
  @Input() useQuery: boolean;
  @Input() activePage: number = 1;
  @Input() set setParamsByLoad(value: Observable<any>) {
    if (value) {
      this.paramsByLoad$ = value;
      this.initObservables();
    }
  }

  pageCount: number = 0;
  disableRequestForQuery: boolean;
  items$: Observable<any>;
  private paramsByLoad$: Observable<any>;
  private pageToLoad$: Observable<any>;
  private subject$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.useQuery) {
      this.subToRoute();
      this.disableRequestForQuery = true;
    }
  }

  changeActivePageValue = () => this.subject$.next({ notReset: true });

  checkPaginationItems = (item: number): boolean => {
    const CHECK_INTERVAL = !(item > this.activePage + this.activePageInterval) && !(item < this.activePage - this.activePageInterval);
    const CHECK_FIRST = item === 1;
    const CHECK_LAST = item === this.pageCount;
    return CHECK_INTERVAL || CHECK_FIRST || CHECK_LAST;
  }

  createRange = (count: number): number[] => {
    const newArr = [];
    for (let i = 1; i <= count; i++) {
      newArr.push(i);
    }
    return newArr;
  }

  prev = () => {
    this.activePage -= 1;
    this.handleRouteQuery();
    this.changeActivePageValue();
  }
  next = () => {
    this.activePage += 1;
    this.handleRouteQuery();
    this.changeActivePageValue();
  }
  changePage = (page: number) => {
    this.activePage = page;
    this.handleRouteQuery();
    this.changeActivePageValue();
  }

  private initObservables(): void {
    this.pageToLoad$ = merge(this.paramsByLoad$, this.subject$)
      .pipe(
        tap((data) => this.prepareData(data)),
      );

    this.items$ = this.pageToLoad$
      .pipe(
        switchMap(_ => this.getData(this.activePage)),
        tap(data => this.handleResponse(data)),
      );
  }

  private prepareData(data: any): void {
    if (!(data && data.notReset) && !this.disableRequestForQuery) {
      this.activePage = 1;
      this.handleRouteQuery();
    } else if (this.disableRequestForQuery) {
      this.disableRequestForQuery = false;
    }
  }

  private handleResponse(data: PagingResponse): void {
    this.items = data.data || [];
    this.pageCount = data.pageCount;

    this.itemsChanged.emit(this.items);
  }

  private handleRouteQuery(): void {
    if (this.useQuery) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { page: this.activePage },
        queryParamsHandling: 'merge',
      });
    }
  }

  @Unsubscribe()
  private subToRoute() {
    return this.activatedRoute.queryParams
      .subscribe(data => {
        if (+data.page && +data.page !== this.activePage) {
          this.changePage(+data.page);
        }
      });
  }
}
