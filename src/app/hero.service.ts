import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // service-in-service
  constructor(private messageService: MessageService) { }

  //this method has a synchronous signature. in a real app, it will likely be a database/server call, which is asynchronous.
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  //we implement an async version of getHeroes
  //later, when we use Angular's HttpClient, its methods return Observables.
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
