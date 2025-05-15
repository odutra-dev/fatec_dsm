import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
// Aplicação principal da API
export class AppController {
  constructor(private readonly appService: AppService) {}
}
