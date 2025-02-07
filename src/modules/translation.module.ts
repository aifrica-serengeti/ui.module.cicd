import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpBackend } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader, TranslateService, LangChangeEvent } from '@ngx-translate/core';

// prefix, suffix interface 설정
export interface TranslateRoute { prefix: string, suffix: string }

// i18n 경로 설정
export function createTranslateLoader(http: HttpBackend): TranslateLoader {
  const commonI18n: TranslateRoute = { prefix: 'assets/i18n/common/', suffix: '.json' };
  const componentI18n: TranslateRoute = { prefix: 'assets/i18n/component/', suffix: '.json' };

  // production 으로 경로 설정 다르게 진행. local일 시 common을 제외.
  const translations: TranslateRoute[] = environment.production ? [componentI18n] : [commonI18n, componentI18n];

  return new MultiTranslateHttpLoader(http, translations);
}

// translate module 옵션 적용
const translationOptions = {
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpBackend],
  },
  isolate: true
};

@NgModule({
  imports: [
    ...(environment.production ?
      [TranslateModule.forChild(translationOptions)] :
      [TranslateModule.forRoot(translationOptions)]),
  ],
  exports: [ TranslateModule ]
})
export class SerengetiDefaultModuleTranslation {
  constructor(private translate: TranslateService) {
    // 환경 변수에 따라 프로덕션 환경과 개발 환경을 구분하여 초기화
    if (environment.production) {
      this.initializeForProduction();
    } else {
      this.initializeForDevelopment();
    }
  }

  // 프로덕션 환경 초기화 함수
  private initializeForProduction(): void {

    // 현재 언어에 대한 번역을 병합하여 store에 저장 및 사용
    this.mergeTranslations(this.translate.store.currentLang);
    this.translate.use(this.translate.store.currentLang);

    // 언어 변경 이벤트 구독
    this.translate.store.onLangChange.subscribe((event: LangChangeEvent) => {
      // 저장 및 사용
      this.mergeTranslations(event.lang);
      this.translate.use(event.lang);
    });
  }

  // 개발 환경 초기화 함수
  private initializeForDevelopment(): void {
    this.translate.addLangs(['ko-kr', 'en-us', 'ja-jp', 'zh-cn']);
    this.translate.use('ko-kr');
  }

  // 번역을 병합하는 함수
  private mergeTranslations(lang: string): void {
    // store에 저장된 번역
    const storeTranslations = this.translate.store.translations[lang] || {};
    // 현재 모듈 번역
    const customTranslations = this.translate.translations[lang] || {};

    this.translate.store.translations[lang] = { ...storeTranslations, ...customTranslations };
  }
}
