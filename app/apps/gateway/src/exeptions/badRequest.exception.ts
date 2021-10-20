import { HttpStatus } from '@nestjs/common';
import CustomException from './custom.exception';

class BadRequestException extends CustomException {
  constructor(message?: string | string[], error?: string) {
    super(HttpStatus.BAD_REQUEST, message, error ? error : ' bad request');
  }
}

export default BadRequestException;
