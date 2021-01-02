import { Usercart } from './usercart.entity';
import { CART_REPOSITORY } from '../../core/constants';

export const usercartProviders = [
  {
    provide: CART_REPOSITORY,
    useValue: Usercart,
  },
];
