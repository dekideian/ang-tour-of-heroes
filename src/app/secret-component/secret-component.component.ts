import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TemplateHandler } from 'easy-template-x';
import { AngularFireStorage } from '@angular/fire/storage';
import '@firebase/storage';
import firebase from '@firebase/app';
@Component({
  selector: 'app-secret-component',
  templateUrl: './secret-component.component.html',
  styleUrls: ['./secret-component.component.css']
})
export class SecretComponentComponent implements OnInit {

  constructor(public authService: AuthService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
     this.getUrl();


  }

  async getUrl() {
    const storage = firebase.app().storage();
    // Create a storage reference from our storage service
    const storageRef = storage.ref();
   //// Create a reference under which you want to list
   // var listRef = storageRef.child('files/uid');

    await storageRef.listAll()
    .then(res => {
      res.items.forEach(itemRef => {
        console.log('avem ceva bun');
        itemRef.getDownloadURL().then(async url => {
          console.log('url nou si bun', url);
          // aici putem baga easy template!
          
          // 'https://firebasestorage.googleapis.com/v0/b/first-572b9.appspot.com/o/template.docx?alt=media&token=2af77430-28b8-40b7-a02e-98eec55a4abd'
          const response = await fetch(url);
          const templateFile = await response.blob();

          const data = {
            posts: [
                { 
                  nrContract: 'Numar Contract',
                  dataContract: 'Data Contract' 
                }
                
            ]
        };
          const handler = new TemplateHandler();
          const doc = await handler.process(templateFile, data);

          // 3. save output
          this.saveFile('myTemplate - output.docx', doc);

        }).catch(err => {
          console.log('some err', err);
        });
      });
    }).catch(err => {
      console.log('err', err);
    });
  }

   saveFile(filename, blob) {

    // see: https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link

    // get downloadable url from the blob
    const blobUrl = URL.createObjectURL(blob);

    // create temp link element
    let link = document.createElement('a');
    link.download = filename;
    link.href = blobUrl;

    // use the link to invoke a download
    document.body.appendChild(link);
    link.click();

    // remove the link
    setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
        link = null;
    }, 0);
}
}
