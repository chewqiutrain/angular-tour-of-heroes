import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes', // css element selector
  templateUrl: './heroes.component.html', // location of the component's template file
  styleUrls: ['./heroes.component.css'] // location of the component's private CSS styles
})
export class HeroesComponent implements OnInit {

  //HeroesComponent will be the parent of HeroDetailComponent
  heroes: Hero[];

  // selectedHero: Hero;
 
  /*
  defines `heroService` as a property, and identifies this as an injection site for `HeroService`
  Reserve the constructor for simple initialization such as wiring constructor parameters to properties. 
  The constructor shouldn't do anything.  
  */
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  // lifecycle hook: called shortly after creating a component. good place for initialization.
  // will execute body at an appropriate time after the HeroesComponent instance is created
  ngOnInit(): void { 
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  //original synchronous version
  /*getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }*/

  //new asynchronous version
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); // subscribe method passes the emitted array (heroes) to the callback (this.heroes = heroes)
  }
}
