import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  languageList = [
    {code: 'de', label: 'de'},
    {code: 'en', label: 'gb'}
  ];
}
