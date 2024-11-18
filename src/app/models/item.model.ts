import { NamedAPIResource } from './pokemon.model';

export interface Item {
  id: number;
  name: string;
  cost: number;
  effect_entries: EffectEntry[];
  sprites: ItemSprites;
  category: NamedAPIResource;
  attributes: NamedAPIResource[];
}

export interface EffectEntry {
  effect: string;
  language: NamedAPIResource;
  short_effect: string;
}

export interface ItemSprites {
  default: string;
}

export interface ItemListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
} 