export interface MenuItem {
  nombre: string;
  descripcion?: string;
  precio: number;
}

export interface MenuCategory {
  categoria: string;
  items: MenuItem[];
}

export interface RestaurantData {
  restaurante: string;
  eslogan: string;
  cheff: string;
  menu: MenuCategory[];
}