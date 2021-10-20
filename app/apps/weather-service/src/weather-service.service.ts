import { HttpService, Injectable } from '@nestjs/common';
import { find } from 'weather-js';

@Injectable()
export class WeatherServiceService {
  httpService = new HttpService();

  getHello(): string {
    return 'Hello World!';
  }

  async getWeather(location: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      find({ search: location, degreeType: 'C' }, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }).then((result) => {
      console.log(result);
      return result;
    });
  }
}
