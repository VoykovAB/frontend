import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ApiService {

    public url = 'http://backend-voykovab.eu-4.evennode.com/users';

    constructor(private http: HttpClient) {
    }

    public post(data: any): Observable<any> {
        return this.http.post(this.url, data)
            .pipe(
                tap(heroes => console.log('fetched "' + this.url + '"')),
                catchError(this.handleError(this.url, []))
            );
    }

    public put(data: any): Observable<any> {
        return this.http.put(this.url, data)
            .pipe(
                tap(heroes => console.log('fetched "' + this.url + '"')),
                catchError(this.handleError(this.url, []))
            );
    }

    public get(): Observable<any> {
        return this.http.get(this.url)
            .pipe(
                tap(heroes => console.log('fetched "' + this.url + '"')),
                catchError(this.handleError(this.url, []))
            );
    }

    public delete(data: any): Observable<any> {
        return this.http.delete(this.url, data)
            .pipe(
                tap(heroes => console.log('fetched "' + this.url + '"')),
                catchError(this.handleError(this.url, []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.error(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}