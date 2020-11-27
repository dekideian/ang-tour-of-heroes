import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { MessagesComponent } from './messages/messages.component';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { HeroSearchComponent } from './hero-search/hero-search.component';


import { AngularFireModule } from '@angular/fire';
import { HomeComponent } from './home/home.component';
import { FirebaseService } from './services/firebase.service';
import { SecretComponentComponent } from './secret-component/secret-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailsComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HomeComponent,
    SecretComponentComponent
  ],
  imports: [
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAqWHJOrxml2AarR51AO70JODMezuLQmhs",
      authDomain: "first-572b9.firebaseapp.com",
      databaseURL: "https://first-572b9.firebaseio.com",
      projectId: "first-572b9",
      storageBucket: "first-572b9.appspot.com",
      messagingSenderId: "575014036382",
      appId: "1:575014036382:web:77ff52a0447e44af1a6c8f",
      measurementId: "G-RS9KN9YS4V"
    }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
