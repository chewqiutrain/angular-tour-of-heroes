import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  //this method has a synchronous signature. in a real app, it will likely be a database/server call, which is asynchronous.
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  //we implement an async version of getHeroes
  //later, when we use Angular's HttpClient, its methods return Observables.
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
}
