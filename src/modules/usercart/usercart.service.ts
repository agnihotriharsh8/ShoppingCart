import { Injectable, Inject } from '@nestjs/common';

import { Usercart } from './usercart.entity';
import { UserCartDto } from './usercart.dto';
import { User } from '../users/user.entity';
import { Item } from '../items/items.entity';
import { CART_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsercartService {
  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepository: typeof Usercart,
  ) {}

  async create(cart: UserCartDto, userId, itemId): Promise<Usercart> {
    return await this.cartRepository.create<Usercart>({
      ...cart,
      userId,
      itemId,
    });
  }

  async findAll(): Promise<Usercart[]> {
    return await this.cartRepository.findAll<Usercart>({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        {
          model: Item,
          attributes: { exclude: ['description'] },
        },
      ],
    });
  }

  async findOne(userId): Promise<Usercart> {
    return await this.cartRepository.findOne({
      where: { userId: userId },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        {
          model: Item,
          attributes: { exclude: ['description'] },
        },
      ],
    });
  }

  async delete(id, userId, itemId) {
    return await this.cartRepository.destroy({ where: { id, userId, itemId } });
  }

  async findCartForUser(userId): Promise<Usercart[]> {
    return await this.cartRepository.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        {
          model: Item,
          attributes: { exclude: ['description'] },
        },
      ],
    });
  }
}
