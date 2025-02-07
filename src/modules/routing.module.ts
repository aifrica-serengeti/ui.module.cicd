import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

import { MainMockComponent } from '../app/main/main.component';

// 컴포넌트 추가 시 해당 항목에 추가
export const routes: Routes = [

  /**
   * ex) { path: 'instance/list', component: ResourceCloudComponent, data: { topUrl: 'resource/instance/list' } }
  * path의 경로 설정은 모듈 전체를 나타내는 단어를 ui.serengeti lazy loading 앞에 작성하며 컴포넌트를 나타내는 단어들을 path 밑에 설정하여 나타냅니다.
  * topUrl 같은 경우 nav의 메뉴 선택을 위해서 사용되는 data 입니다. 현재 메뉴의 최상위 메뉴의 url을 작성하시면 됩니다.
  */
];

export const rootRoutes: Routes = [
  // path가 기본일 시 routes 첫 번째에 있는 컴포넌트로 이동
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  // main path 경로 밑 routes 설정
  { path: 'main', component: MainMockComponent, children: [
      ...routes
  ]}
]

@NgModule({
  imports: [
    ...(environment.production ?
      [RouterModule.forChild(routes)] :
      [RouterModule.forRoot(rootRoutes)]),
  ],
  exports: [ RouterModule ]
})
export class SerengetiCiCdModuleRouting { }
