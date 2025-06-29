import { Component, output, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-new-printer',
  imports: [],
  templateUrl: './new-printer.component.html',
  styleUrl: './new-printer.component.css',
  host: { '[attr.ngSkipHydration]': 'true' },
})
export class NewPrinterComponent {
  close = output<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.closeModal();
  }

  onOverlayClick(event: MouseEvent) {
    // Check if the click was on the overlay (not on the modal content)
    const modalContent =
      this.elementRef.nativeElement.querySelector('.modal-content');
    if (!modalContent.contains(event.target as Node)) {
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
  }
}
