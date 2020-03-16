import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HistoryService {
    ulrs: string[] = [];
    constructor(private router: Router) {
        this.router.events.pipe(filter(routerEvent => routerEvent instanceof NavigationEnd))
            .subscribe((routerEvent: NavigationEnd) => {
                const url = routerEvent.urlAfterRedirects;
                this.ulrs = [...this.ulrs, url];
            });
    }

    getPreviousUrl(): string {
        const length = this.ulrs.length;
        return length > 1 ? this.ulrs[length - 2] : '/';
    }

    getLastNonLoginUrl(): string {
        const exclude: string[] = ['/register', '/login'];
        const filtered = this.ulrs.filter(url => !exclude.includes(url));
        const length = filtered.length;
        return length > 1 ? filtered[length - 1] : '/';
    }
}
