import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsersService, User } from './users.service';

interface CreateUserDto {
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface UpdateUserDto extends Partial<CreateUserDto> {}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): User {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): User {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): { message: string } {
    this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }

  @Get('search')
  search(@Query('email') email?: string, @Query('name') name?: string): User[] {
    const users = this.usersService.findAll();
    
    if (email) {
      return users.filter(user => user.email.includes(email));
    }
    
    if (name) {
      return users.filter(user => user.name.includes(name));
    }
    
    return users;
  }
}