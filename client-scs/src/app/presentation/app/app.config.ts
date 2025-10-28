import { ApplicationConfig, ENVIRONMENT_INITIALIZER, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AuthRepository } from '../../core/domain/repositories/auth.repository';
import { AuthApiService } from '../../core/infrastructure/api/auth.api.service';
import { IProfileRepository } from '../../core/domain/repositories/profile.repository';
import { ProfileApiService } from '../../core/infrastructure/api/profile.api.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { authInterceptor } from '../../core/infrastructure/interceptors/auth.interceptor';
import { mockApiInterceptor } from '../../core/infrastructure/mock-backend/interceptors/api-mock.interceptor';
import { provideMockBackend } from '../../core/infrastructure/mock-backend/providers/backend-mock.provider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MockInitService } from '../../core/infrastructure/mock-backend/services/init-mock.service';
import { DashboardRepository } from '../../core/domain/repositories/dashboard.repository';
import { DashboardApiService } from '../../core/infrastructure/api/dashboard.api.service';
import { ContactRepository } from '../../core/domain/repositories/contact.repository';
import { ContactApiService } from '../../core/infrastructure/api/contact.api.service';
import { TransactionApiService } from '../../core/infrastructure/api/transaction.api.service';
import { TransactionRepository } from '../../core/domain/repositories/transaction.repository';
import { DocumentApiService } from '../../core/infrastructure/api/document.api.service';
import { DocumentRepository } from '../../core/domain/repositories/document.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        ...(environment.useMockBackend ? [mockApiInterceptor] : []),
      ])
    ),
    ...(environment.useMockBackend ? [provideMockBackend()] : []),
     ...(environment.useMockBackend ? [
      provideMockBackend(),
      {
        provide: ENVIRONMENT_INITIALIZER,
        useValue: () => inject(MockInitService).initializeAllMockData(),
        multi: true
      }
    ] : []),
    { provide: AuthRepository, useClass: AuthApiService },
    { provide: DashboardRepository, useClass: DashboardApiService },
    { provide: IProfileRepository, useClass: ProfileApiService },
    { provide: ContactRepository, useClass: ContactApiService },
    { provide: TransactionRepository, useClass: TransactionApiService },
    { provide: DocumentRepository, useClass: DocumentApiService },
    importProvidersFrom(
      BrowserAnimationsModule, // Required for animations
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
      }),
    ),
  ],
};
