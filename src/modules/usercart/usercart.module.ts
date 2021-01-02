import { Module } from '@nestjs/common';
import { UsercartService } from './usercart.service';
import { UsercartController } from './usercart.controller';
import { usercartProviders } from './usercart.provider';

@Module({
  providers: [UsercartService, ...usercartProviders],
  controllers: [UsercartController],
})
export class UsercartModule {}
