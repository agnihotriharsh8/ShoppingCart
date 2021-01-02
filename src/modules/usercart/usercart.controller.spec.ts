import { Test, TestingModule } from '@nestjs/testing';
import { UsercartController } from './usercart.controller';

describe('UsercartController', () => {
  let controller: UsercartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsercartController],
    }).compile();

    controller = module.get<UsercartController>(UsercartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
