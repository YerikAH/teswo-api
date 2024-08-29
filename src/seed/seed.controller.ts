/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Auth(ValidRoles.admin)
  @Get()
  @ApiOperation({
    summary: 'Execute seed',
    description:
      'This endpoint runs the seed operation to populate the database with initial data. Only accessible to admin users.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Seed operation executed successfully',
    schema: {
      example: {
        message: 'Seed executed successfully',
        data: 'Detailed information about the seed execution...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'Unauthorized',
      },
    },
  })
  executeSeed() {
    return this.seedService.runSeed();
  }
}
