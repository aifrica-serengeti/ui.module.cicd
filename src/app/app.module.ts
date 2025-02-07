import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SerengetiThemeUIModule } from '../modules/theme/theme.module';
import { SerengetiCommonUIModule } from '../modules/common.ui.module';
import { SerengetiCommonMaterialModule } from '@serengeti/serengeti-common-material';
import { SerengetiDefaultModuleRouting } from '../modules/routing.module';
import { SerengetiDefaultModuleTranslation } from '../modules/translation.module';

import { environment } from '../environments/environment';
import { Configurations } from '../config/Configuration';

import { AppComponent } from './app.component';
import { MainMockComponent } from './main/main.component';
import { MenuMockComponent } from './main/menu/menu.component';
import { HeaderMockComponent } from './main/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMockComponent,
    MenuMockComponent,
    HeaderMockComponent,
  ],
  imports: [
    // 라이브러리로 활용될 때는 CommonModule을 제공
    ...(environment.production ? [CommonModule] :
        [BrowserModule,
        BrowserAnimationsModule,
        SerengetiCommonUIModule,
        SerengetiThemeUIModule]),
    // 로컬 테스트일 때는 BrowserModule, BrowserAnimation 및 SerengetiCommonModule, SerengetiThemeModule을 선택

    FormsModule,
    MaterialModule,
    HttpClientModule,

    SerengetiCommonMaterialModule,
    SerengetiDefaultModuleRouting,
    SerengetiDefaultModuleTranslation
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SerengetiDefaultModule {
  constructor() {}

  public static forRoot(config: Configurations): ModuleWithProviders<SerengetiDefaultModule> {
    Configurations.setGlobalConfig(config);

    return { ngModule: SerengetiDefaultModule };
  }

  public static forModule(config: Configurations) : ModuleWithProviders<SerengetiDefaultModule> {
    const module = removeRoutingModule();
    Configurations.setGlobalConfig(config);

    return { ngModule: module };
  }
}

// module 로 활용 시에 라우팅 옵션을 제거하는 함수
export function removeRoutingModule() {
  const module = Object.assign({}, SerengetiDefaultModule as any);

  for (let idx in module) {
    // 모듈 search 시 object 가 아닌 것들은 스킵
    if (typeof(module[idx]) != "object") {
      continue;
    }

    module[idx] = Object.assign({}, module[idx]);
    let table = module[idx];

    for (let name in table) {
      if(name == "imports") {
        table[name] = Object.assign({}, table[name]);
        let imports = table[name];
        let newImports = [];

        for (let idx2 in imports) {
          let name = imports[idx2].name;
          if (imports[idx2] !== SerengetiDefaultModuleRouting) {
            newImports.push(imports[idx2]);
          }
        }
        table[name] = newImports;
      }
    }
  }

  return module;
}

