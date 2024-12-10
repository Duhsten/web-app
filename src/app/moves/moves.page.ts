import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Move } from '../models/move.model';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.page.html',
  styleUrls: ['./moves.page.scss']
})
export class MovesPage implements OnInit {
  moves: Move[] = [];
  isLoading = false;
  currentPage = 0;
  searchTerm = '';
  
  typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    // ... (same as pokemon-detail.page.ts)
  };

  constructor(
    private pokemonService: PokemonService,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadMoves();
  }

  async loadMoves(event?: any) {
    if (!event) {
      this.isLoading = true;
    }

    try {
      const response = await this.pokemonService.getMovesList(20, this.currentPage * 20);
      
      const moveDetails = await Promise.all(
        response.results.map(move => this.pokemonService.getMoveDetails(move.name))
      );
      
      this.moves = [...this.moves, ...moveDetails];
      this.currentPage++;
    } catch (error) {
      console.error('Error loading moves:', error);
    } finally {
      this.isLoading = false;
      if (event) {
        event.target.complete();
      }
    }
  }

  async onSearchChange(event: any) {
    this.searchTerm = event.detail.value.toLowerCase();
    this.currentPage = 0;
    this.moves = [];
    await this.loadMoves();
  }

  getTypeColor(type: string): string {
    return this.typeColors[type.toLowerCase()] || '#777777';
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/dashboard');
  }
} 