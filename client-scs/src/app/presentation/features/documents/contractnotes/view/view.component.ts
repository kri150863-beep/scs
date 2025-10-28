import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../../../../../core/infrastructure/services/document.service';
import { Document } from '../../../../../core/domain/entities/document.entity';
import { dateFormat as dF } from '../../../../../core/shared/utils/date.util';
import { numberFormat as nF } from '../../../../../core/shared/utils/number.util';

@Component({
  selector: 'contractnotes-view',
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ContractnotesViewComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<ContractnotesViewComponent>)
  readonly data = inject<any>(MAT_DIALOG_DATA)
  id = this.data.id
  contractNote! : Document
  dateFormat = dF
  numberFormat = nF

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.contractNote = this.documentService.getContractNoteById(this.id)
  }
}
