import { Expose, Type } from 'class-transformer';
import { ArgNum } from 'discord-nestjs';

export class DictionaryInputDto {
  @ArgNum(() => ({ position: 1 }))
  @Expose()
  @Type(() => String)
  word: string;
}
