import { randomUUID } from 'crypto';

export default class IntentDto {
  constructor(
    tag?: string,
    patterns?: string[],
    responses?: string[],
    context?: string[],
  ) {
    this.uuid = randomUUID();
    this.tag = tag;
    this.patterns = patterns;
    this.responses = responses;
    this.context = context;
    this.created = new Date();
  }

  uuid?: string;

  tag!: string;

  patterns?: string[];

  responses?: string[];

  context?: string[];

  created?: Date;

  updated?: Date;
}
