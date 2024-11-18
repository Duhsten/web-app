import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  allItems: Item[] = [];
  displayedItems: Item[] = [];
  isLoading = true;
  searchTerm = '';
  sortBy = 'id';
  sortDirection = 'asc';
  
  readonly pageSize = 20;
  private currentDisplayIndex = 0;

  sortOptions = [
    { value: 'id', label: 'ID' },
    { value: 'name', label: 'Name' },
    { value: 'cost', label: 'Cost' }
  ];

  constructor(private itemService: ItemService) {}

  async ngOnInit() {
    await this.loadAllItems();
  }

  async loadAllItems() {
    try {
      const initial = await this.itemService.getItemList(1, 0);
      const totalItems = initial.count;
      
      const response = await this.itemService.getItemList(totalItems, 0);
      
      const batchSize = 20;
      const batches = Math.ceil(response.results.length / batchSize);
      
      for (let i = 0; i < batches; i++) {
        const batch = response.results.slice(i * batchSize, (i + 1) * batchSize);
        const itemBatch = await Promise.all(
          batch.map(item => this.itemService.getItemDetails(item.name))
        );
        this.allItems.push(...itemBatch);
        this.applyFiltersAndSort();
      }
      
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading items:', error);
      this.isLoading = false;
    }
  }

  loadMore(event?: any) {
    const nextBatch = this.displayedItems.slice(
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
    let filtered = this.allItems.filter(item => {
      const matchesSearch = item.name.toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      return matchesSearch;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (this.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'cost':
          comparison = a.cost - b.cost;
          break;
        default: // 'id'
          comparison = a.id - b.id;
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.displayedItems = filtered.slice(0, this.currentDisplayIndex + this.pageSize);
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
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
}
