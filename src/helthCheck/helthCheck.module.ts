import { Module } from '@nestjs/common';
import { HelthCheckController } from './helthCheck.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [HelthCheckController],
})
export class HelthCheckModule {}
