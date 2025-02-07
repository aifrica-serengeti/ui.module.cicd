import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SerengetiCiCdModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(SerengetiCiCdModule)
  .catch(err => console.error(err));
