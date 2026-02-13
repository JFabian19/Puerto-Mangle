export interface MenuItem {
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen?: string;
}

export interface MenuCategory {
  categoria: string;
  items: MenuItem[];
  imagen?: string;
}

export interface RestaurantData {
  restaurante: string;
  eslogan: string;
  cheff: string;
  menu: MenuCategory[];
}