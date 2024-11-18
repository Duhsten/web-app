import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'pokemon',
        children: [
          {
            path: '',
            loadChildren: () => import('../pokedex/pokedex.module').then(m => m.PokedexPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../pokemon-detail/pokemon-detail.module').then(m => m.PokemonDetailPageModule)
          }
        ]
      },
      {
        path: 'items',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../item-detail/item-detail.module').then(m => m.ItemDetailPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
