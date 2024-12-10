import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Move } from '../models/move.model';
import { LoadingController } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-move-detail',
  templateUrl: './move-detail.page.html',
  styleUrls: ['./move-detail.page.scss']
})
export class MoveDetailPage implements OnInit {
  move?: Move;
  isLoading = true;
  error: string | null = null;

  typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    // ... (same as pokemon-detail.page.ts)
  };

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    await this.loadMoveDetails();
  }

  async loadMoveDetails() {
    const loading = await this.loadingController.create({
      message: 'Loading move details...',
      spinner: 'bubbles'
    });
    await loading.present();

    try {
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) throw new Error('No Move ID provided');

      this.move = await this.pokemonService.getMoveDetails(id);
      this.error = null;
    } catch (error) {
      console.error('Error loading move:', error);
      this.error = 'Failed to load move details. Please try again.';
    } finally {
      this.isLoading = false;
      await loading.dismiss();
    }
  }

  getTypeColor(type: string): string {
    return this.typeColors[type.toLowerCase()] || '#777777';
  }

  async shareMove() {
    if (!this.move) return;

    const shareText = `Check out the Pokémon move ${this.move.name}!\n\n` +
      `Type: ${this.move.type.name}\n` +
      `Power: ${this.move.power || 'N/A'}\n` +
      `Accuracy: ${this.move.accuracy ? this.move.accuracy + '%' : 'N/A'}\n` +
      `PP: ${this.move.pp}\n\n` +
      `Effect: ${this.move.effect_entries[0]?.effect || 'No effect description available.'}`;

    try {
      await Share.share({
        title: `Pokémon Move: ${this.move.name}`,
        text: shareText,
        dialogTitle: 'Share this move',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
} 