import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ItemsService } from './items.service';
import { Item as ItemEntity } from './items.entity';
import { ItemDto } from './item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  @Get()
  async findAll() {
    // get all posts in the db
    return await this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ItemEntity> {
    // find the post with this id
    const post = await this.itemService.findOne(id);

    // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // if post exist, return the post
    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() post: ItemDto, @Request() req): Promise<ItemEntity> {
    // create a new post and return the newly created post
    return await this.itemService.create(post);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: ItemDto,
    @Request() req,
  ): Promise<ItemEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedItem } = await this.itemService.update(
      id,
      post,
    );

    // if the number of row affected is zero, it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Item doesn't exist");
    }

    // return the updated post
    return updatedItem;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.itemService.delete(id);

    // if the number of row affected is zero, then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This item doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
