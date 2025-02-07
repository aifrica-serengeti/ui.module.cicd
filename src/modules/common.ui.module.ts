import { NgModule } from '@angular/core';

import { Configurations } from '../config/Configuration';
import { environment } from '../environments/environment';

import { SerengetiCommonModule } from '@serengeti/serengeti-common';

export function getProduction(): boolean {
  return environment.production;
}

export function getLoginEndPoint() {
  return Configurations.serviceLoginEndPoint;
}

@NgModule({
  imports: [
    ...(environment.production ? [] : [
      SerengetiCommonModule.forRoot({
        ...environment.commonOptions,
        getProduction,
        getLoginEndPoint,
      })
    ])
  ],
  exports: [ SerengetiCommonModule ]
})
export class SerengetiCommonUIModule {}
