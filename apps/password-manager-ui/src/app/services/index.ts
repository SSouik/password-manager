export * from './bff/bff.service';
export * from './browser-storage/browser-storage.service';

import { BFFService } from './bff/bff.service';
import { BrowserStorageService } from './browser-storage/browser-storage.service';

export default [BFFService, BrowserStorageService];
