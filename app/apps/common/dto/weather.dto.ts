import { currentWeatherDto } from './currentWeather.dto';
import { forecastDTO } from './forecast.dto';
import { weatherLocationDto } from './weatherLocation.dto';

export class weatherDTO {
  location: weatherLocationDto;
  current: currentWeatherDto;
  forecasts: forecastDTO[];
}
