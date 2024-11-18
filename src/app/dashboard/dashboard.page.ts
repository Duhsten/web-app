import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage {
  dashboardItems = [
    {
      title: 'Pokédex',
      icon: 'assets/icons/pokeball.svg',
      color: 'primary',
      route: '/tabs/pokemon',
      description: 'Browse all Pokémon and their details'
    },
    {
      title: 'Items',
      icon: 'assets/icons/bag.svg',
      color: 'secondary',
      route: '/tabs/items',
      description: 'Explore Pokémon items and their uses'
    },
    {
      title: 'Moves',
      icon: 'assets/icons/moves.svg',
      color: 'tertiary',
      route: '/tabs/moves',
      description: 'Learn about Pokémon moves and abilities'
    },
    // {
    //   title: 'Locations',
    //   icon: 'assets/icons/location.svg',
    //   color: 'success',
    //   route: '/tabs/locations',
    //   description: 'Discover Pokémon world locations'
    // },
    // {
    //   title: 'Types',
    //   icon: 'assets/icons/types.svg',
    //   color: 'warning',
    //   route: '/tabs/types',
    //   description: 'Study Pokémon types and relationships'
    // },
    // {
    //   title: 'Evolution',
    //   icon: 'assets/icons/evolution.svg',
    //   color: 'danger',
    //   route: '/tabs/evolution',
    //   description: 'View Pokémon evolution chains'
    // }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
