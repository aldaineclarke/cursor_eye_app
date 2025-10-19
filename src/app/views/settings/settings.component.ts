import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger('dropdownAnimation', [
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'scale(0.95)',
          display: 'none',
        })
      ),
      state(
        'open',
        style({
          opacity: 1,
          transform: 'scale(1)',
          display: 'block',
        })
      ),
      transition('closed => open', [
        style({ display: 'block' }),
        animate('100ms ease-out'),
      ]),
      transition('open => closed', [animate('75ms ease-in')]),
    ]),
  ],
})
export class SettingsComponent {
  isDropdownOpen = false;
  isMobileMenuOpen = false;
}
