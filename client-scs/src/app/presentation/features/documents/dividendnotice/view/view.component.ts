import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../../../../../core/infrastructure/services/document.service';
import { Document } from '../../../../../core/domain/entities/document.entity';
import { dateFormat as dF } from '../../../../../core/shared/utils/date.util';

@Component({
  selector: 'dividendnotice-view',
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class DividendnoticeViewComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DividendnoticeViewComponent>)
  readonly data = inject<any>(MAT_DIALOG_DATA)
  id = this.data.id
  dividendNotice!: Document
  dateFormat = dF

  constructor(private documentService: DocumentService) {}
  
  ngOnInit(): void {
    this.dividendNotice = this.documentService.getDividendNoticeById(this.id)
  }
}
