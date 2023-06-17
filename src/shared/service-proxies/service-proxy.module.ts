import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import * as ApiServiceProxies from './service-proxies';
import { AbpHttpInterceptor } from 'abp-ng2-module';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.StorageServiceProxy,
        ApiServiceProxies.CategoryServiceProxy,
        ApiServiceProxies.ProductServiceProxy,
        ApiServiceProxies.ExportImportService,
        ApiServiceProxies.StructureServiceProxy,
        ApiServiceProxies.EmployeeServiceProxy,
        ApiServiceProxies.CustomerServiceProxy,
        ApiServiceProxies.ExpensesService,
        ApiServiceProxies.UploadServiceProxy,
        ApiServiceProxies.FileDownloadService,
        ApiServiceProxies.VnPayService,
        ApiServiceProxies.RetailService,
        ApiServiceProxies.SumaryServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
