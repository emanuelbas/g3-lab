import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  //Tuve que ponerlo en public
  //https://stackoverflow.com/questions/43141576/property-x-is-private-and-only-accessible-within-class-xyzcomponent
  constructor(public authService: AuthService) {}
}
