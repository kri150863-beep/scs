import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AccountInfoComponent } from '../account-info/account-info.component';
import { FinancialInfoComponent } from '../financial-info/financial-info.component';
import { AdminSettingsComponent } from '../admin-settings/admin-settings.component';
import { SecuritySettingsComponent } from '../security-settings/security-settings.component';
import { ToastService } from '../../../../core/infrastructure/services/toast.service';
import { ProfileService } from '../../../../core/infrastructure/services/profile.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { User } from '../../../../core/domain/entities/user.entity';
import { AuthService } from '../../../../core/infrastructure/services/auth.service';
import { AccountInformation } from '../../../../core/domain/entities/profile.entity';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { EmploymentInfoComponent } from '../employment-info/employment-info.component';
import { DocumentInfoComponent } from '../documents/document.component';

type ProfileTab =
  | 'account'
  | 'financial'
  | 'employment'
  | 'admin'
  | 'security'
  | 'document';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AccountInfoComponent,
    FinancialInfoComponent,
    EmploymentInfoComponent,
    // AdminSettingsComponent,
    SecuritySettingsComponent,
    DocumentInfoComponent,
    MatIconModule,
    ButtonComponent
  ],
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',
})
export class SettingComponent implements OnInit, OnDestroy {
  currentUser$: Observable<User | null>;
  private userSubscription!: Subscription;
  private destroy$ = new Subject<void>();

  selectedTab: ProfileTab = 'account';
  currentUser: User | null = null;
  isLoading$!: Observable<boolean>;
  accountInfo!: AccountInformation;

  tabs = [
    { id: 'account', label: 'Personal Information' },
    { id: 'financial', label: 'Financial Information' },
    { id: 'employment', label: 'Employment Information' },
    // { id: 'admin', label: 'Administrative Settings' },
    { id: 'security', label: 'Security Information' },
    { id: 'document', label: 'Documents' },
  ];

  constructor(
    private toast: ToastService,
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
    this.userSubscription = this.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.loadProfile(user?.id || '');
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectTab(tabId: any): void {
    this.selectedTab = tabId;
  }

  onBackToClaimList(): void {
    this.router.navigate(['dashboard/claims']);
  }

  private loadProfile(userId: string): void {
    this.profileService
      .loadProfile(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          const user = res;
          // this.currentUser = user;
          this.accountInfo = res?.personal_information || {};
        },
        error: (error: any) => {
          this.toast.error(error || 'Failed to load account information');
        },
      });
  }
}
