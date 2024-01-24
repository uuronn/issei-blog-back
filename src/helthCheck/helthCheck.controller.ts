import { Controller, Get } from '@nestjs/common';

@Controller('helth_check')
export class HelthCheckController {
  @Get()
  getHelthCheck(): string {
    return 'helth_check ok';
  }
}
