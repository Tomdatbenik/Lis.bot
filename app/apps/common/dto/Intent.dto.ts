import { randomUUID } from 'crypto';

export default class IntentDto {
  constructor(
    tag?: string,
    patterns?: string[],
    responses?: string[],
  ) {
    this.tag = tag;
    this.patterns = patterns;
    this.responses = responses;
  }

  tag!: string;

  patterns?: string[];

  responses?: string[];

}
