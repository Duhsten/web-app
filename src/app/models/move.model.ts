import { NamedAPIResource } from './pokemon.model';

export interface Move {
  id: number;
  name: string;
  accuracy: number;
  effect_chance: number | null;
  pp: number;
  priority: number;
  power: number;
  damage_class: NamedAPIResource;
  effect_entries: MoveEffectEntry[];
  target: NamedAPIResource;
  type: NamedAPIResource;
}

export interface MoveEffectEntry {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

export interface MoveListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
} 