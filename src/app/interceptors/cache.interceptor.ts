import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache: { [key: string]: HttpResponse<any> } = {};
  
    constructor(private loadingService: LoadingService) {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.startLoading();
    
        if (request.method === "GET") {
            const cachedResponse: HttpResponse<any> | null = this.getFromCache(request);
            if (cachedResponse) {
                setTimeout(() => {
                    this.loadingService.stopLoading();
                }, 200);
                return of(cachedResponse);
            }
        }
        
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (request.method === "GET") {
                        this.addToCache(request, event);
                        this.loadingService.stopLoading();
                    }
                }
            })
        );
    }
  
    private getFromCache(request: HttpRequest<any>): HttpResponse<any> | null {
        const cacheKey = this.getCacheKey(request);
        const cachedResponse = this.cache[cacheKey];
        return cachedResponse ? cachedResponse.clone() : null;
    }
  
    private addToCache(request: HttpRequest<any>, response: HttpResponse<any>): void {
        const cacheKey = this.getCacheKey(request);
        this.cache[cacheKey] = response.clone();
    }
  
    private getCacheKey(request: HttpRequest<any>): string {
        const url = request.urlWithParams;
        const headers = request.headers.keys().map(key => `${key}:${request.headers.get(key)}`).join("|");
        return `${url}|${headers}`;
    }

}
