import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Configurations {

  // forRoot 로 적용되는 인스턴스 변수 명과 static 변수 명을 동일하게 적용하여 오류 최소화
  serviceTheme?: () => string;
  serviceProfile?: () => string;
  serviceCodeEndPoint?: () => string;
  serviceLoginEndPoint?: () => string;

  // static 변수 값들
  static serviceProfile: string = 'staging';
  static serviceLoginEndPoint: string = 'https://api.serengeti-stage.aifrica.co.kr/api.login/auth/v1/handle/';

  // theme 전용
  static serviceTheme: string = 'light';
  static serviceCodeEndPoint: string = 'https://api.serengeti-stage.aifrica.co.kr/api.config/config/v1/handle/';

  static setGlobalConfig(config: Configurations): void {
    // config key 값을 통해 static 변수에 할당
    const configKeys: string[] = Object.keys(config);
    configKeys.forEach((key: string) => {
      (Configurations as any)[key] = (config as any)[key]();
    })
  }

  // root 모듈 로딩 시 config 주입 파일 생성하는 메서드
  static getConfig(): any {
    const configKeys: (keyof typeof Configurations)[] = Object.keys(Configurations) as (keyof typeof Configurations)[];
    let config = { ...environment.commonOptions };
    // service가 포함된 key 값을 통해 config 객체 생성
    configKeys.forEach((key: keyof typeof Configurations) => {
      if (key.includes('service')) {
        (config as any)[key] = () => Configurations[key]
      }
    })

    return config;
  }
}
