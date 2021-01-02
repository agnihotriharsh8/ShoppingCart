import { Item } from './items.entity';
import { ITEM_REPOSITORY } from '../../core/constants';

export const itemsProviders = [
  {
    provide: ITEM_REPOSITORY,
    useValue: Item,
  },
];
