import { Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  value = new FormControl('');

  @Input()
  type!: string;

  @Input()
  id!: string;

  @Input()
  label!: string;

  onChange!: Function;

  onTouched!: Function;

  constructor() { }

  ngOnInit(): void {
    this.value.valueChanges.subscribe(() => {
      this.onChange(this.value.value);
    });
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  writeValue(): void {}
}
