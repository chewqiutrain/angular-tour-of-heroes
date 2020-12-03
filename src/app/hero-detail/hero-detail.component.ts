import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero; // must be an Input property because external HeroesComponent will bind to this

  constructor(
    private route: ActivatedRoute, // holds information about the route to this instance of HeroDetailComponent; we are interested in the id value 
    private heroService: HeroService, // gets hero data from the remote server and tthis component will use it to get the hero to display 
    private location: Location  // an Angular service for interacting with the browser. Will use it to navigate back to the view that navigated here
  ) { }

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    // `+` is a Javascript operator that converts the string to a number. (Route params are always strings) 
    const id = +this.route.snapshot.paramMap.get('id')
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack())
  }

}
