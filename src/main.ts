import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SerengetiDefaultModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(SerengetiDefaultModule)
  .catch(err => console.error(err));
