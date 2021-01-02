import { Injectable, Inject } from '@nestjs/common';

import { Item } from './items.entity';
import { ItemDto } from './item.dto';
import { User } from '../users/user.entity';
import { ITEM_REPOSITORY } from '../../core/constants';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(ITEM_REPOSITORY) private readonly itemRepository: typeof Item,
  ) {}

  async create(item: ItemDto): Promise<Item> {
    return await this.itemRepository.create<Item>({ ...item });
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.findAll<Item>({});
  }

  async findOne(id): Promise<Item> {
    return await this.itemRepository.findOne({ where: { id }, });
  }

  async delete(id) {
    return await this.itemRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [
      numberOfAffectedRows,
      [updatedItem],
    ] = await this.itemRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );

    return { numberOfAffectedRows, updatedItem };
  }
}
