import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Item, ItemListResponse } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly ITEM_ENDPOINT = 'item';

  constructor(private apiService: APIService) {}

  async getItemList(limit: number = 20, offset: number = 0): Promise<ItemListResponse> {
    return this.apiService.requestFromApi(`${this.ITEM_ENDPOINT}?limit=${limit}&offset=${offset}`);
  }

  async getItemDetails(idOrName: number | string): Promise<Item> {
    return this.apiService.requestFromApi(`${this.ITEM_ENDPOINT}/${idOrName}`);
  }
} 