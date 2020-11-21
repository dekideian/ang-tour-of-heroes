import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroesList => this.heroes = heroesList);
  }
  delete(hero: Hero): void {
    
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.delete(hero).subscribe();
  }
  add(name: string): void{
    name = name.trim();
    if (!name) { return ; }

    this.heroService.add({name} as Hero)
    .subscribe(hero => this.heroes.push(hero));
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
