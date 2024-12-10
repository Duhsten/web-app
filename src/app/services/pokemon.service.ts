import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';
import { firstValueFrom } from 'rxjs';
import { Move, MoveListResponse } from '../models/move.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly POKEMON_ENDPOINT = 'pokemon';
  private readonly MOVES_ENDPOINT = 'move';

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

  /**
   * Get a list of moves with pagination
   * @param limit Number of moves to fetch
   * @param offset Number of moves to skip
   */
  async getMovesList(limit: number = 20, offset: number = 0): Promise<MoveListResponse> {
    return this.apiService.requestFromApi(`${this.MOVES_ENDPOINT}?limit=${limit}&offset=${offset}`);
  }

  /**
   * Get detailed information about a specific move
   * @param idOrName Move ID or name
   */
  async getMoveDetails(idOrName: number | string): Promise<Move> {
    return this.apiService.requestFromApi(`${this.MOVES_ENDPOINT}/${idOrName}`);
  }
} 