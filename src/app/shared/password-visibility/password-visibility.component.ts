import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-password-visibility',
  templateUrl: './password-visibility.component.html',
  styleUrls: ['./password-visibility.component.scss'],
  exportAs: 'passwordVisibility'
})
export class PasswordVisibilityComponent {

  @Input() name: string = '';
  @Input() value: string = '';
  isPasswordVisible: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('control') control?: NgModel;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onInput(val:string) {
    this.valueChange.emit(val);
  }

  constructor() { }
}
