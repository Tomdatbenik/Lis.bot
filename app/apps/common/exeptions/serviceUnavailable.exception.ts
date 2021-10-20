import { HttpStatus } from '@nestjs/common';
import CustomException from './custom.exception';

class ServiceUnavailable extends CustomException {
  constructor(message?: string | string[], error?: string) {
    super(
      HttpStatus.SERVICE_UNAVAILABLE,
      message,
      error ? error : ' Service Unavailable',
    );
  }
}

export default ServiceUnavailable;
