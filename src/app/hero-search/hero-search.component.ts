import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  //Remember that the component class does not subscribe to the heroes$ observable. 
  //That's the job of the AsyncPipe in the template.
  heroes$: Observable<Hero[]>;

  // Subject is both a source of Observable values as well as an Observable itself,
  // so we can subscribe to it.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    // .next pushes values into the Bbservable
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    //pipe searchTerms through a sequence of rxjs operators so as to reduce the number of calls
    //to heroService.searchHeroes(), returning an observable of timely hero search results 
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      
      //ignore new term if same as previous. Only send a request if the filter text has changed.
      distinctUntilChanged(),

      //switch to new search Observable each time the term changes
      //i.e. it cancels and discards previous search Observables, returning only the latest.
      //Results from prior calls are canceled and discarded.
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }

}
