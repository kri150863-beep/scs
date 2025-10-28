import { Route } from '@angular/router';
import { roleGuard } from '../../../core/infrastructure/guards/role.guard';
import { UserRoles } from '../../../core/shared/constants/roles.const';

export const MAIN_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../../features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    title: 'SWAN - Capital Solutions Platform',
    // canActivate: [roleGuard],
    data: { roles: [UserRoles.SURVEYOR] }
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('../../features/profile/setting/setting.component').then(
        (m) => m.SettingComponent
      ),
    title: 'Profile',
    canActivate: [roleGuard],
    data: { roles: [UserRoles.SURVEYOR, UserRoles.GARAGE, UserRoles.SPARE_PARTS] }
  },
  {
    path: 'documents/statements',
    loadComponent: () =>
      import('../../features/documents/statements/statements.component').then(
        (m) => m.StatementsComponent
      ),
    title: 'Statements',
    canActivate: [roleGuard],
    data: { roles: [UserRoles.SURVEYOR, UserRoles.GARAGE, UserRoles.SPARE_PARTS] }
  },
  {
    path: 'documents/factsheets',
    loadComponent: () =>
      import('../../features/documents/factsheets/factsheets.component').then(
        (m) => m.FactsheetsComponent
      ),
    title: 'Factsheets',
    canActivate: [roleGuard],
    data: { roles: [UserRoles.SURVEYOR, UserRoles.GARAGE, UserRoles.SPARE_PARTS] }
  },
  {
    path: 'documents/contractnotes',
    loadComponent: () =>
      import('../../features/documents/contractnotes/contractnotes.component').then(
        (m) => m.ContractnotesComponent
      ),
    title: 'Contract Notes',
    canActivate: [roleGuard],
    data: { roles: [UserRoles.SURVEYOR, UserRoles.GARAGE, UserRoles.SPARE_PARTS] }
  },
  {
    path: 'documents/dividendnotice',
    loadComponent: () =>
      import('../../features/documents/dividendnotice/dividendnotice.component').then(
        (m) => m.DividendnoticeComponent
      ),
    title: 'Statements',
    canActivate: [roleGuard],
    data: { roles: [UserRoles.SURVEYOR, UserRoles.GARAGE, UserRoles.SPARE_PARTS] }
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('../../features/contact-us/contact-us.component').then(
        (m) => m.ContactUsComponent
      ),
    title: 'Contact - Us',
    canActivate: [roleGuard],
    data: { roles: [UserRoles.SURVEYOR, UserRoles.GARAGE, UserRoles.SPARE_PARTS] }
  },
  {
    path: 'transaction',
    loadComponent: () =>
      import('../../features/transaction/transaction.component').then(
        (m) => m.TransactionComponent
      ),
    title: 'SWAN - Transaction',
    data: { roles: [UserRoles.SURVEYOR] }
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
