import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // getHero(id: number) {
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => id === hero.id));
  //   // throw new Error('Method not implemented.');
  // }

  constructor(private http: HttpClient, private messageService: MessageService) {

  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  
/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

  add(hero: Hero): Observable<Hero> {

    return this.http.post(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap( _ => console.log(`create hero with name ${name}`)),
      catchError(this.handleError<any>(`create`))
    );
  }

  delete(hero: Hero): Observable<Hero> {
    const oneHero = `${this.heroesUrl}/${hero.id}`;

    return this.http.delete(oneHero, this.httpOptions)
    .pipe(
      tap( _ => console.log(`delete hero with name ${hero.name}`)),
      catchError(this.handleError<any>(`delete`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    const oneHero = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(oneHero, hero, this.httpOptions)
    .pipe(
      tap( _ => console.log(`update hero with id ${hero.id}`)),
      catchError(this.handleError<Hero>(`updateHero with id ${hero.id}`))

    );
  }

  getHero(id: number): Observable<Hero> {

    const oneHero = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(oneHero)
      .pipe(
        tap( _ => console.log(`fetch one hero with id ${id}`)),
        catchError(this.handleError<Hero>(`getHero with id ${id}`))

      );
  }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: Heroes fetched');
   // return of(HEROES);
     // tslint:disable-next-line: align
     return this.http.get<Hero[]>(this.heroesUrl)
                .pipe(
                   tap(_=>console.log('fetched heroes')),
                   catchError(this.handleError<Hero[]>('getHeroes', []))
                 );
  }

  /**
 // tslint:disable-next-line: jsdoc-format
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
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
