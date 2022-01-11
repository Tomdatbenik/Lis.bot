import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import Channel from 'apps/common/entities/channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.CHANNEL_DB_HOST,
      port: process.env.CHANNEL_DB_PORT as unknown as number,
      username: process.env.CHANNEL_DB_USERNAME,
      password: process.env.CHANNEL_DB_PASSWORD,
      database: process.env.CHANNEL_DB_DATABASE,
      entities: [Channel],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Channel]),
  ],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
