import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly POKEMON_ENDPOINT = 'pokemon';

  constructor(private apiService: APIService) {}

  /**
   * Get a list of Pokemon with pagination
   * @param limit Number of Pokemon to fetch
   * @param offset Number of Pokemon to skip
   */
  async getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
    return this.apiService.requestFromApi(`${this.POKEMON_ENDPOINT}?limit=${limit}&offset=${offset}`);
  }

  /**
   * Get detailed information about a specific Pokemon
   * @param idOrName Pokemon ID or name
   */
  async getPokemonDetails(idOrName: number | string): Promise<Pokemon> {
    return this.apiService.requestFromApi(`${this.POKEMON_ENDPOINT}/${idOrName}`);
  }
} 