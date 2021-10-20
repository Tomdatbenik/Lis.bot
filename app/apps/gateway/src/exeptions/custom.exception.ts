import { HttpException, HttpStatus } from '@nestjs/common';

class CustomException extends HttpException {
  constructor(
    statusCode: HttpStatus,
    message: string | string[],
    error: string,
  ) {
    super({ statusCode: statusCode, message, error }, statusCode);
  }
}

export default CustomException;
