import { HttpStatus } from '@nestjs/common';
import CustomException from './custom.exception';

class NotFound extends CustomException {
  constructor(message?: string | string[], error?: string) {
    super(
      HttpStatus.NOT_FOUND,
      message,
      error ? error : 'Not found.',
    );
  }
}

export default NotFound;
