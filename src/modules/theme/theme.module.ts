import { NgModule } from '@angular/core';

import { environment } from '../../environments/environment';
import { themeTestColor } from './theme.test.color';
import { Configurations } from '../../config/Configuration';

import { SerengetiThemeModule, ThemeService } from '@serengeti/serengeti-theme';

export function getTheme(): string {
  return Configurations.serviceTheme;
}

export function getCodeEndPoint() {
  return Configurations.serviceCodeEndPoint;
}

export function getLoginEndPoint() {
  return Configurations.serviceLoginEndPoint;
}

@NgModule({
  imports: [
    ...(environment.production ? [] : [
      SerengetiThemeModule.forRoot({
        ...environment.commonOptions,
        getTheme,
        getCodeEndPoint,
        getLoginEndPoint,
      })
    ])
  ],
  exports: [ SerengetiThemeModule ]
})
export class SerengetiThemeUIModule {
  constructor(private themeService: ThemeService) {
    // theme test 값 설정
    this.themeService.testObj = themeTestColor;
    // theme 초기 세팅 진행
    this.themeService.initialSetting();
  }
}
