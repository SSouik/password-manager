import { Controller, Get, Inject } from '@nestjs/common';
import { LOGGER } from '@password-manager:api:providers';
import { ILogger } from '@password-manager:logger';

import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, @Inject(LOGGER) private readonly logger: ILogger) {}

    @Get()
    getData() {
        this.logger.info('Running a message here', { key: 'foo' });
        return this.appService.getData();
    }
}
