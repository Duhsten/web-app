import { Component } from '@angular/core';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private pokimonAPI: PokemonService) {
    this.test();
  }

  async test() {
    console.log(await this.pokimonAPI.getPokemonDetails("ditto"))
  }
}
