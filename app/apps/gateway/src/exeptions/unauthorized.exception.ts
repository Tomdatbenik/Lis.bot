import { HttpStatus } from '@nestjs/common';
import CustomException from './custom.exception';

class UnauthorizedException extends CustomException {
  constructor(message?: string | string[], error?: string) {
    super(
      HttpStatus.UNAUTHORIZED,
      message,
      error ? error : 'Unauthorized.',
    );
  }
}

export default UnauthorizedException;
