import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon, PokemonMove } from '../models/pokemon.model';
import { LoadingController } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss']
})
export class PokemonDetailPage implements OnInit {
  pokemon?: Pokemon;
  isLoading = true;
  error: string | null = null;
  
  // For UI state management
  activeSegment = 'about';
  
  // Type colors for styling
  typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };

  moveSearchTerm: string = '';
  filteredMoves: PokemonMove[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    await this.loadPokemonDetails();
    this.filteredMoves = this.pokemon?.moves || [];
  }

  async loadPokemonDetails() {
    const loading = await this.loadingController.create({
      message: 'Loading Pokémon details...',
      spinner: 'bubbles'
    });
    await loading.present();

    try {
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) throw new Error('No Pokemon ID provided');

      this.pokemon = await this.pokemonService.getPokemonDetails(id);
      this.error = null;
    } catch (error) {
      console.error('Error loading Pokemon:', error);
      this.error = 'Failed to load Pokémon details. Please try again.';
    } finally {
      this.isLoading = false;
      await loading.dismiss();
    }
  }

  // Helper methods for the UI
  getTypeColor(type: string): string {
    return this.typeColors[type] || '#777777';
  }

  // Format height from decimeters to meters
  formatHeight(height: number): string {
    return (height / 10).toFixed(1) + 'm';
  }

  // Format weight from hectograms to kilograms
  formatWeight(weight: number): string {
    return (weight / 10).toFixed(1) + 'kg';
  }

  // Calculate stat percentage for progress bars
  getStatPercentage(baseStat: number): number {
    // Using 255 as the max possible base stat (Blissey's HP)
    const maxBaseStat = 255;
    // Calculate percentage but cap it at 100
    return Math.min((baseStat / maxBaseStat) * 100, 100);
  }

  segmentChanged(event: any) {  
    this.activeSegment = event.detail.value;  
  }  
    
  async doRefresh(event: any) {  
    await this.loadPokemonDetails();  
    event.target.complete();  
  }  
  
  async sharePokemon() {
    if (!this.pokemon) return;

    // Format stats into a readable string
    const stats = this.pokemon.stats
      .map(stat => `${stat.stat.name}: ${stat.base_stat}`)
      .join('\n');

    // Format types into a readable string
    const types = this.pokemon.types
      .map(type => type.type.name)
      .join(', ');

    const shareText = `Check out ${this.pokemon.name.toUpperCase()}!\n\n` +
      `Types: ${types}\n` +
      `Height: ${this.formatHeight(this.pokemon.height)}\n` +
      `Weight: ${this.formatWeight(this.pokemon.weight)}\n\n` +
      `Base Stats:\n${stats}`;

    try {
      await Share.share({
        title: `Pokémon: ${this.pokemon.name}`,
        text: shareText,
        url: this.pokemon.sprites.front_default, // Include the Pokemon's image URL
        dialogTitle: 'Share this Pokémon',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  filterMoves() {
    if (!this.pokemon) return;
    
    this.filteredMoves = this.pokemon.moves.filter(move =>
      move.move.name.toLowerCase().includes(this.moveSearchTerm.toLowerCase())
    );
  }
} 