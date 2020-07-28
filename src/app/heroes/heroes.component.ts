import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes', // css element selector
  templateUrl: './heroes.component.html', // location of the component's template file
  styleUrls: ['./heroes.component.css'] // location of the component's private CSS styles
})
export class HeroesComponent implements OnInit {

  heroes = HEROES;

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  }

  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  constructor() { }

  ngOnInit(): void { // lifecycle hook: called shortly after creating a component. good place for initialization.
  }

}
