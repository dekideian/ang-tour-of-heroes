import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  isLoggedIn = false;
  constructor(public firebaseAuth: AngularFireAuth) { }

  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      this.isLoggedIn = true;
      console.log("we have a logged in user: " + JSON.stringify(res.user));
      localStorage.setItem('user', JSON.stringify(res.user));
    })
  }
  logout(){

    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
