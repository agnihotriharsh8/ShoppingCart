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

import { UsercartService } from './usercart.service';
import { Usercart as UsercartEntity } from './usercart.entity';
import { UserCartDto } from './usercart.dto';

@Controller('usercart')
export class UsercartController {
  constructor(private readonly usercartService: UsercartService) {}

  @Get()
  async findAll() {
    // get all posts in the db
    return await this.usercartService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UsercartEntity> {
    // find the post with this id
    const post = await this.usercartService.findOne(id);

    // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException("This cart entry doesn't exist");
    }

    // if post exist, return the post
    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() cart: UserCartDto,
    @Request() req,
  ): Promise<UsercartEntity> {
    // create a new post and return the newly created post
    return await this.usercartService.create(
      cart,
      req.user.id,
      req.body.item.id,
    );
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('getMyCart')
  async findCartForUser(@Request() req): Promise<UsercartEntity[]> {
    return await this.usercartService.findCartForUser(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.usercartService.delete(
      id,
      req.user.id,
      req.item.id,
    );

    // if the number of row affected is zero, then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This cart item doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
