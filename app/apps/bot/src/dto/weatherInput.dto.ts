import { Expose, Type } from 'class-transformer';
import { ArgNum } from 'discord-nestjs';

export class WeatherInputDto {
  @ArgNum(() => ({ position: 1 }))
  @Expose()
  @Type(() => String)
  location: string;
}
