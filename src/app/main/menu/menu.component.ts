import { Component, ElementRef, OnInit, ViewChild, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

import { NavSignalService } from '../service/nav.signal.service';
import { menu } from './menu.mock.data';

@Component({
  selector: 'lib-프로젝트 명 변경-mock-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuMockComponent implements OnInit {

  // workspaces menu 리스트
  workspacesMenus: any[] = menu.Workspaces;
  // admin menu 리스트
  adminMenus: any[] = menu.Admin;
  // nav signal service
  navOpen: WritableSignal<boolean>;
  isHover: WritableSignal<boolean>;

  customRoutes: { name: string, url: string }[] = [];

  @ViewChild('appMenu', { static: true }) appMenu?: any;

  constructor(
    private el: ElementRef,
    private router: Router,
    private navSignal: NavSignalService,
  ) {
    // signal 초기화
    this.navOpen = this.navSignal.navOpen;
    this.isHover = this.navSignal.isHover;
  }

  async ngOnInit() {
    // app menu drag시 border-top 생성
    this.appMenu!.nativeElement.addEventListener('scroll', () => {
      if (this.appMenu!.nativeElement.scrollTop > 0) {
        this.el.nativeElement.classList.add('scroll-border');
      } else {
        this.el.nativeElement.classList.remove('scroll-border');
      }
    });

    // routes를 받아와 링크 생성
    const { rootRoutes, routes } = await import('../../../modules/routing.module');

    let defaultUrl = rootRoutes[0].redirectTo;

    routes.forEach((route: any) => {
      this.customRoutes.push({ name: route.component.name, url: defaultUrl + '/' + route.path })
    });
  }

  // 선택한 컴포넌트로 이동하는 메서드
  moveCustomRoute(route: string) {
    this.router.navigate([...route.split('/')]);
  }
}
