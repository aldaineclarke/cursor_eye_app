import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import Config from './settings';

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
  isManualVideoConfigEnabled: boolean = false;

  isConnected: boolean = true; // mock status, can be updated via backend
  statusMessage: string = '';

  isLogoutModalOpen: boolean = false;

  resolutions: string[] = ['720p', '1080p', '1440p', '4K'];

  config: Config = {
    resolution: '1080p',
    fps: 30,
    videoWidth: 1920,
    videoHeight: 1080
  };

  applyConfig() {
    console.log('Applying config:', this.config);
    this.statusMessage = 'Configuration applied successfully ✅';
  }

  resetConfig() {
    this.config = {
      resolution: '1080p',
      fps: 30,
      videoWidth: 1920,
      videoHeight: 1080
    };
    this.statusMessage = 'Configuration reset to defaults';
  }

  openLogoutModal() {
    this.isLogoutModalOpen = true;
  }

  closeLogoutModal() {
    this.isLogoutModalOpen = false;
  }

  logout() {
    this.isLogoutModalOpen = false;
    // Implement your logout logic here
    console.log('Logging out...');
    // For example: this.authService.logout();
  }

}
