import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptors
import { HttpConfigInterceptor } from './interceptors/http-config.interceptor';

// Modules
import { SharedModule } from '@app/modules/shared/shared.module';
import { CoreStoreModule } from './core-store/core-store.module';

// Services
import { LeagueService } from './services/league.service';

// Guards
import { LeagueGuard } from './guards/league.guard';

const modules = [
  SharedModule,
  CoreStoreModule
];

const services = [
  LeagueService
];

const guards = [
  LeagueGuard
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ...modules
  ],
  exports: [
    ...modules
  ],
  providers: [
    ...services,
    ...guards,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
