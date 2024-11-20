import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: 'pokedex.page.html',
  styleUrls: ['pokedex.page.scss']
})
export class PokedexPage implements OnInit {
  allPokemon: Pokemon[] = [];
  displayedPokemon: Pokemon[] = [];
  isLoading = true;
  searchTerm = '';
  selectedType = '';
  sortBy = 'id';
  sortDirection = 'asc';
  
  readonly pageSize = 20;
  private currentDisplayIndex = 0;
  
  filters = {
    type: '',
    minWeight: null as number | null,
    maxWeight: null as number | null,
    minHeight: null as number | null,
    maxHeight: null as number | null,
  };
  
  pokemonTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  sortOptions = [
    { value: 'id', label: 'ID' },
    { value: 'name', label: 'Name' },
    { value: 'weight', label: 'Weight' },
    { value: 'height', label: 'Height' }
  ];

  showFilters = false;

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    await this.loadAllPokemon();
  }

  async loadAllPokemon() {
    try {
      // Get total count first
      const initial = await this.pokemonService.getPokemonList(1, 0);
      const totalPokemon = initial.count;
      
      // Load all Pokemon basic data
      const response = await this.pokemonService.getPokemonList(totalPokemon, 0);
      
      // Load details in batches
      const batchSize = 20;
      const batches = Math.ceil(response.results.length / batchSize);
      
      for (let i = 0; i < batches; i++) {
        const batch = response.results.slice(i * batchSize, (i + 1) * batchSize);
        const pokemonBatch = await Promise.all(
          batch.map(pokemon => this.pokemonService.getPokemonDetails(pokemon.name))
        );
        this.allPokemon.push(...pokemonBatch);
        this.applyFiltersAndSort();
      }
      
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading Pokemon:', error);
      this.isLoading = false;
    }
  }

  loadMore(event?: any) {
    const nextBatch = this.displayedPokemon.slice(
      this.currentDisplayIndex,
      this.currentDisplayIndex + this.pageSize
    );
    
    if (nextBatch.length > 0) {
      this.currentDisplayIndex += this.pageSize;
      if (event) {
        event.target.complete();
      }
    } else if (event) {
      event.target.disabled = true;
    }
  }

  applyFiltersAndSort() {
    let filtered = this.allPokemon.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      
      const matchesType = !this.filters.type || 
        pokemon.types.some(type => type.type.name === this.filters.type);
      
      const matchesWeight = (!this.filters.minWeight || pokemon.weight >= this.filters.minWeight) &&
        (!this.filters.maxWeight || pokemon.weight <= this.filters.maxWeight);
      
      const matchesHeight = (!this.filters.minHeight || pokemon.height >= this.filters.minHeight) &&
        (!this.filters.maxHeight || pokemon.height <= this.filters.maxHeight);

      return matchesSearch && matchesType && matchesWeight && matchesHeight;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (this.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'weight':
          comparison = a.weight - b.weight;
          break;
        case 'height':
          comparison = a.height - b.height;
          break;
        default: // 'id'
          comparison = a.id - b.id;
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.displayedPokemon = filtered.slice(0, this.currentDisplayIndex + this.pageSize);
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.resetPagination();
    this.applyFiltersAndSort();
  }

  onFilterChange() {
    this.resetPagination();
    this.applyFiltersAndSort();
  }

  onSortChange() {
    this.resetPagination();
    this.applyFiltersAndSort();
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.onSortChange();
  }

  resetPagination() {
    this.currentDisplayIndex = this.pageSize;
  }

  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
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
    return typeColors[type] || '#777777';
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
