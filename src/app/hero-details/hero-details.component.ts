import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }


  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  save(): void{
    console.log(`save hero with id ${this.hero.id}`);
    this.heroService.updateHero(this.hero)
    .subscribe(_ => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
