import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface GCodeFile {
  id: string;
  name: string;
  size: string;
  dateModified: Date;
  estimatedPrintTime: string;
}

@Component({
  selector: 'app-sd-card',
  imports: [],
  templateUrl: './sd-card.component.html',
  styleUrl: './sd-card.component.css',
})
export class SdCardComponent {
  @Input() files: GCodeFile[] = [];
  @Input() emptyTitle: string = 'No files found';
  @Input() emptyMessage: string =
    'Connect an SD card or upload G-code files to get started.';

  @Output() print = new EventEmitter<GCodeFile>();
  @Output() preview = new EventEmitter<GCodeFile>();
  @Output() download = new EventEmitter<GCodeFile>();
  @Output() delete = new EventEmitter<GCodeFile>();
  @Output() refresh = new EventEmitter<void>();

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  onPrint(file: GCodeFile): void {
    this.print.emit(file);
  }

  onPreview(file: GCodeFile): void {
    this.preview.emit(file);
  }

  onDownload(file: GCodeFile): void {
    this.download.emit(file);
  }

  onDelete(file: GCodeFile): void {
    this.delete.emit(file);
  }

  onRefresh(): void {
    this.refresh.emit();
  }
}
