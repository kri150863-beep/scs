import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../core/infrastructure/services/profile.service';
import { Subject, takeUntil } from 'rxjs';
import { EmploymentField, FinancialField } from '../../../../core/domain/entities/profile.entity';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-employment-info',
  templateUrl: './employment-info.component.html',
  styleUrls: [
    './employment-info.component.scss',
    '../setting/setting.component.scss',
  ],
})
export class EmploymentInfoComponent implements OnInit, OnDestroy {
  fields: EmploymentField[] = [];

  private destroy$ = new Subject<void>();

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.subscribeToFinancialChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToFinancialChanges(): void {
    this.profileService.employmentFields$
      .pipe(takeUntil(this.destroy$))
      .subscribe((fields) => {
        this.fields = fields;
      });
  }
}
