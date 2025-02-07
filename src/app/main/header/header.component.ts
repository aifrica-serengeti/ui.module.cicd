import { Component } from '@angular/core';

import { NavSignalService } from '../service/nav.signal.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lib-프로젝트 명 변경-mock-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderMockComponent {

  // language
  language: string = 'ko-kr';

  constructor(
    public navSignal: NavSignalService,
    private translate: TranslateService
  ) {}

  setSession() {
    const session = {
      loginId: "administrator",
      loginName: "Administrator",
      accessKey: "AifricaSerengetiDevAccesskey",
      secretKey: "AifricaSerengetiDevSecretkey",
      loggedIn: true
    }

    localStorage.setItem('serengetiSession', JSON.stringify(session));
  }

  // translate 언어 변경
  langChange(lang: string) {
    this.language = lang;
    this.translate.use(lang);
  }
}
