import { HttpStatus } from '@nestjs/common';
import CustomException from './custom.exception';

class InternalServerException extends CustomException {
  constructor(message?: string | string[], error?: string) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      error ? error : 'Internal server error.',
    );
  }
}

export default InternalServerException;
