import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // service-in-service
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  //this method has a synchronous signature. in a real app, it will likely be a database/server call, which is asynchronous.
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  private log(message: String) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes'; // URL to web API 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //we implement an async version of getHeroes
  //later, when we use Angular's HttpClient, its methods return Observables.
  // getHeroes(): Observable<Hero[]> { // kinda like IO[A]
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation: String = 'operation', result?: T) { // Option[T]
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // implicit casting? 
      return of(result as T) 
    }
  }

  // using HttpClient to get heroes
  getHeroes(): Observable<Hero []> {
    //this.log('call getHeroes using HttpClient');
    return this.http.get<Hero []>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes using HttpClient')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero with id: ${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  //using HttpClient
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`using HttpClient fetched hero id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id: ${id}`))
    );
  }



  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero with id = ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if empty search term, return empty array
      return of([]);
    }
    
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ? 
        this.log(`found heroes matching term: "${term}"`) : 
        this.log(`no heroes matching term "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeros', []))
    );
  }
}
