export type ProductCategory =
  | 'Fungisit'
  | 'Herbisit'
  | 'İnsektisit'
  | 'Tohum İlacı'
  | 'Biyostimulant'
  | 'Biyoinsektisit';

export type CropType =
  | 'Buğday'
  | 'Arpa'
  | 'Mısır'
  | 'Ayçiçeği'
  | 'Pamuk'
  | 'Çeltik'
  | 'Domates'
  | 'Hıyar'
  | 'Patates'
  | 'Zeytin'
  | 'Üzüm'
  | 'Elma'
  | 'Kayısı'
  | 'Kiraz'
  | 'Turunçgil'
  | 'Antepfıstığı'
  | 'Şeker Pancarı'
  | 'Tütün'
  | 'Soya';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  activeIngredient: string;
  formulation: string;
  crops: CropType[];
  targets: string[];
  dose: string;
  phi: string; // Pre-harvest interval
  description: string;
  features: string[];
}
