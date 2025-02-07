import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavSignalService {
  // mouse enter, leave 이벤트로 hover 변경
  isHover: WritableSignal<boolean> = signal(false);
  // nav open 버튼 시
  navOpen: WritableSignal<boolean> = signal(true);

  constructor() { }
}
