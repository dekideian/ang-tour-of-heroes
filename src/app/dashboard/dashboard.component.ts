import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  isSignedIn = false;
  constructor(private heroService: HeroService,
    public firebaseService: FirebaseService,
     public auth: AuthService//this is the official one
    ) { }

  ngOnInit(): void {
    this.getHeroes();
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

  async signIn(email: string, password: string) {
    await this.firebaseService.signin(email, password);
    if(this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
    }
  }

  handleLogout() {
    console.log("logout was handled")
    this.isSignedIn = false;
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }


}
