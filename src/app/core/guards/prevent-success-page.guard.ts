import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {getRequestPageDetails} from 'src/app/state/request-page/request-page.selector';
import {AppState} from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root'
})
export class PreventSuccessPageGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(getRequestPageDetails),
      map(value => {
        if (value && value.requestPage !== '') {
          return true;
        } else {
          this.router.navigate([]);
          return false;
        }
      })
    );
  }
}
