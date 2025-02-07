import { Component, WritableSignal } from '@angular/core';

import { NavSignalService } from './service/nav.signal.service';

@Component({
  selector: 'lib-serengeti-cicd-mock-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainMockComponent {

  // nav 이벤트 발생 시 hover에 delay를 걸 변수
  hoverDelay: boolean = true;
  // nav signal service
  navOpen: WritableSignal<boolean>;
  isHover: WritableSignal<boolean>;

  constructor(
    private navSignal: NavSignalService,
  ) {
    // signal 초기화
    this.navOpen = this.navSignal.navOpen;
    this.isHover = this.navSignal.isHover;
  }

  // nav open close event
  navOpenEvent() {
    // nav를 열고 닫는 동작을 토글합니다.
    this.navOpen.set(!this.navOpen());

    // nav를 닫은 경우, hoverDelay를 애니메이션 끝난 시점에 false로 설정합니다.
    if (!this.navOpen()) {
      setTimeout(() => {
        this.hoverDelay = false;
      }, 200);
    } else {
      // nav를 열 때, 초기화를 진행합니다.
      this.hoverDelay = true;
      this.isHover.set(false);
    }
  }

  // hoverEvent 메서드
  hoverEvent(event: string) {
    // nav가 닫혀있고 hoverDelay가 없을 때만 event 발생
    if (!this.navOpen() && !this.hoverDelay) {
      this.isHover.set(event === 'enter');
    }
  }


}
