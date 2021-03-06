import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { itemsProviders } from './item.provider';

@Module({
  providers: [ItemsService, ...itemsProviders],
  controllers: [ItemsController],
})
export class ItemsModule {}
