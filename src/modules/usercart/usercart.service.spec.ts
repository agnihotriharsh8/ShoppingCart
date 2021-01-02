import { Test, TestingModule } from '@nestjs/testing';
import { UsercartService } from './usercart.service';

describe('UsercartService', () => {
  let service: UsercartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsercartService],
    }).compile();

    service = module.get<UsercartService>(UsercartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
