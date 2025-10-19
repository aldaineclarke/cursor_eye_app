import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ConfigService } from '../../services/config.service';
import Config from './settings';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

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
export class SettingsComponent implements OnInit {
  // --- UI states ---
  isDropdownOpen:boolean = false;
  isMobileMenuOpen:boolean = false;
  isManualVideoConfigEnabled:boolean = false;
  isLogoutModalOpen:boolean = false;
  isConnected:boolean = false;
  isLoading:boolean = false;
  user?:IUser;
  // --- Feedback states ---
  statusMessage:string = '';
  toastMessage:string = '';
  toastType: 'success' | 'error' | '' = '';

  // --- Configuration data ---
  resolutions: number[] = [720, 1080, 1440, 4000];
  config: Config = {
    resolution: 720,
    fps: 30,
    videoWidth: 1920,
    videoHeight: 1080,
  };
  default_config: Config = {
    resolution: 720,
    fps: 30,
    videoWidth: 1920,
    videoHeight: 1080,
  };

  constructor(private configService: ConfigService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadConfig();

  }

  /** 🔹 Fetch configuration from backend */
  loadConfig() {
    this.isLoading = true;
    this.statusMessage = 'Loading configuration...';

    this.configService
      .getConfig()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.config = res.data;
          let storedUser = localStorage.getItem("user");
          this.user = storedUser ? JSON.parse(storedUser) : "";
          console.log(res)
          this.isConnected = true;
          this.statusMessage = 'Configuration loaded ✅';
          this.showToast('Configuration loaded successfully.', 'success');
        },
        error: (err) => {
          this.isConnected = false;
          this.statusMessage = 'Failed to load configuration ❌';
          this.showToast('Unable to reach device configuration.', 'error');
          console.error(err);
        },
      });
  }

  /** 🔹 Apply configuration changes */
  applyConfig() {
    this.isLoading = true;
    this.statusMessage = 'Applying configuration...';
    this.config = {
      fps : +(this.config.fps),
      videoHeight : +(this.config.videoHeight),
      videoWidth: +(this.config.videoWidth),
      resolution: +(this.config.resolution)

    }
    this.configService
      .applyConfig(this.config)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.statusMessage = 'Configuration applied successfully ✅';
          this.showToast('Configuration applied successfully.', 'success');
        },
        error: (err) => {
          this.statusMessage = 'Failed to apply configuration ❌';
          this.showToast('Error applying configuration.', 'error');
          console.error(err);
        },
      });
  }

  /** 🔹 Reset to default configuration */
  resetConfig() {
    this.isLoading = true;
    this.statusMessage = 'Resetting configuration...';

    this.configService
      .resetConfig(this.default_config)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (data: Config) => {
          this.config = data;
          this.statusMessage = 'Configuration reset to defaults ✅';
          this.showToast('Configuration reset to defaults.', 'success');
          this.loadConfig()
        },
        error: (err) => {
          this.statusMessage = 'Failed to reset configuration ❌';
          this.showToast('Error resetting configuration.', 'error');
          console.error(err);
        },
      });
  }

  /** 🔹 Toast helper for feedback */
  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = '';
      this.toastType = '';
    }, 3000);
  }

  /** 🔹 Logout modal controls */
  openLogoutModal() {
    this.isLogoutModalOpen = true;

  }

  closeLogoutModal() {
    this.isLogoutModalOpen = false;
  }

  logout() {
    this.isLogoutModalOpen = false;
    console.log('Logging out...');
    // TODO: Hook up your AuthService logout logic
    this.userService.logout()
  }
}

export interface IUser {
  firstName: string;
  id: string;
  lastName: string;
  email:string;
}
