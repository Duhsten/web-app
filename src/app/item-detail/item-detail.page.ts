import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss']
})
export class ItemDetailPage implements OnInit {
  item?: Item;
  isLoading = true;
  error: string | null = null;
  
  // For UI state management
  activeSegment = 'details';

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    await this.loadItemDetails();
  }

  async loadItemDetails() {
    const loading = await this.loadingController.create({
      message: 'Loading item details...',
      spinner: 'bubbles'
    });
    await loading.present();

    try {
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) throw new Error('No Item ID provided');

      this.item = await this.itemService.getItemDetails(id);
      this.error = null;
    } catch (error) {
      console.error('Error loading item:', error);
      this.error = 'Failed to load item details. Please try again.';
    } finally {
      this.isLoading = false;
      await loading.dismiss();
    }
  }

  // Helper methods for the UI
  getEffectText(language: string = 'en'): string {
    const effect = this.item?.effect_entries.find(
      entry => entry.language.name === language
    );
    return effect?.effect || 'No effect description available.';
  }

  getShortEffectText(language: string = 'en'): string {
    const effect = this.item?.effect_entries.find(
      entry => entry.language.name === language
    );
    return effect?.short_effect || 'No effect description available.';
  }

  formatCost(cost: number): string {
    return `₽${cost.toLocaleString()}`;
  }

  // Segment changed handler
  segmentChanged(event: any) {
    this.activeSegment = event.detail.value;
  }

  // Refresh item data
  async doRefresh(event: any) {
    await this.loadItemDetails();
    event.target.complete();
  }
} 