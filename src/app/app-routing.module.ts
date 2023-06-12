import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { StorageComponent } from './main/storage/storage.component';
import { CreateStorageComponent } from './main/storage/create-storage/create-storage.component';
import { EditStorageComponent } from './main/storage/edit-storage/edit-storage.component';
import { CategoryComponent } from './main/category/category.component';
import { CreateCategoryComponent } from './main/category/create-category/create-category.component';
import { EditCategoryComponent } from './main/category/edit-category/edit-category.component';
import { DetailCategoryComponent } from './main/category/detail-category/detail-category.component';
import { ProductComponent } from './main/product/product.component';
import { CreateProductComponent } from './main/product/create-product/create-product.component';
import { EditProductComponent } from './main/product/edit-product/edit-product.component';
import { DetailProductComponent } from './main/product/detail-product/detail-product.component';
import { DetailStorageComponent } from './main/storage/detail-storage/detail-storage.component';
import { ExportImportComponent } from './main/export-import/export-import.component';
import { CreateExportImportComponent } from './main/export-import/create-export-import/create-export-import.component';
import { EditExportImportComponent } from './main/export-import/edit-export-import/edit-export-import.component';
import { DetailsExportImportComponent } from './main/export-import/details-export-import/details-export-import.component';
import { StructureComponent } from './main/structure/structure.component';
import { CreateStructureComponent } from './main/structure/create-structure/create-structure.component';
import { EditStructureComponent } from './main/structure/edit-structure/edit-structure.component';
import { EmployeeComponent } from './main/employee/employee.component';
import { CreateEmployeeComponent } from './main/employee/create-employee/create-employee.component';
import { EditEmployeeComponent } from './main/employee/edit-employee/edit-employee.component';
import { CustomerComponent } from './main/customer/customer.component';
import { CreateCustomerComponent } from './main/customer/create-customer/create-customer.component';
import { EditCustomerComponent } from './main/customer/edit-customer/edit-customer.component';
import { ExpensesComponent } from './main/expenses/expenses.component';
import { CreateExpensesComponent } from './main/expenses/create-expenses/create-expenses.component';
import { DetailExpensesComponent } from './main/expenses/detail-expenses/detail-expenses.component';
import { UploadComponent } from './main/upload/upload.component';
import { RetailComponent } from './main/retail/retail.component';
import { CreateRetailComponent } from './main/retail/create-retail/create-retail.component';
import { RetailDetailComponent } from './main/retail/retail-detail/retail-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent, canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'storage', component: StorageComponent, data: { permission: 'Pages.System.Storage.View'} , canActivate: [AppRouteGuard] },
                    { path: 'storage/create', component: CreateStorageComponent, data: { permission: 'Pages.System.Storage.Add'} , canActivate: [AppRouteGuard] },
                    { path: 'storage/edit/:id', component: EditStorageComponent, data: { permission: 'Pages.System.Storage.Update'} , canActivate: [AppRouteGuard] },
                    { path: 'storage/detail/:id', component: DetailStorageComponent, data: { permission: 'Pages.System.Storage.View'} , canActivate: [AppRouteGuard] },
                    { path: 'category', component: CategoryComponent, data: { permission: 'Pages.System.Category.View'} , canActivate: [AppRouteGuard] },
                    { path: 'category/create', component: CreateCategoryComponent, data: { permission: 'Pages.System.Category.Add'} , canActivate: [AppRouteGuard] },
                    { path: 'category/edit/:id', component: EditCategoryComponent, data: { permission: 'Pages.System.Category.Update'} , canActivate: [AppRouteGuard] },
                    { path: 'category/detail/:id', component: DetailCategoryComponent, data: { permission: 'Pages.System.Category.View'} , canActivate: [AppRouteGuard] },
                    { path: 'product', component: ProductComponent, data: { permission: 'Pages.System.Product.View'} , canActivate: [AppRouteGuard] },
                    { path: 'product/create', component: CreateProductComponent, data: { permission: 'Pages.System.Product.Add'} , canActivate: [AppRouteGuard] },
                    { path: 'product/edit/:id', component: EditProductComponent, data: { permission: 'Pages.System.Product.Update'} , canActivate: [AppRouteGuard] },
                    { path: 'product/detail/:id', component: DetailProductComponent, data: { permission: 'Pages.System.Product.View'} , canActivate: [AppRouteGuard] },
                    { path: 'exportimport', component: ExportImportComponent, data: { permission: 'Pages.System.ExportImport.View'} , canActivate: [AppRouteGuard] },
                    { path: 'exportimport/create', component: CreateExportImportComponent, data: { permission: 'Pages.System.ExportImport.Add'} , canActivate: [AppRouteGuard] },
                    { path: 'exportimport/edit/:id', component: EditExportImportComponent, data: { permission: 'Pages.System.ExportImport.Update'} , canActivate: [AppRouteGuard] },
                    { path: 'exportimport/detail/:id', component: DetailsExportImportComponent, data: { permission: 'Pages.System.ExportImport.View'} , canActivate: [AppRouteGuard] },
                    { path: 'structure', component: StructureComponent, data: { permission: 'Pages.System.Structure.View'} , canActivate: [AppRouteGuard] },
                    { path: 'structure/create', component: CreateStructureComponent, data: { permission: 'Pages.System.Structure.Add'} , canActivate: [AppRouteGuard] },
                    { path: 'structure/edit/:id', component: EditStructureComponent, data: { permission: 'Pages.System.Structure.Update'} , canActivate: [AppRouteGuard] },
                    { path: 'structure/detail/:id', component: DetailsExportImportComponent, data: { permission: 'Pages.System.Structure.View'} , canActivate: [AppRouteGuard] },                    
                    { path: 'employee', component: EmployeeComponent, data: { permission: 'Pages.System.Employee.View'} , canActivate: [AppRouteGuard] },
                    { path: 'employee/create', component: CreateEmployeeComponent, data: { permission: 'Pages.System.Employee.Add'} , canActivate: [AppRouteGuard] },
                    { path: 'employee/edit/:id', component: EditEmployeeComponent, data: { permission: 'Pages.System.Employee.Update'} , canActivate: [AppRouteGuard] },
                    { path: 'employee/detail/:id', component: DetailsExportImportComponent, data: { permission: 'Pages.System.Employee.View'} , canActivate: [AppRouteGuard] },                    
                    { path: 'customer', component: CustomerComponent, data: { permission: 'Pages.System.Customer.View'} , canActivate: [AppRouteGuard] },
                    { path: 'customer/create', component: CreateCustomerComponent, data: { permission: 'Pages.System.Customer.Add'} , canActivate: [AppRouteGuard] },
                    { path: 'customer/edit/:id', component: EditCustomerComponent, data: { permission: 'Pages.System.Customer.Update'} , canActivate: [AppRouteGuard] },
                    { path: 'customer/detail/:id', component: DetailsExportImportComponent, data: { permission: 'Pages.System.Employee.View'} , canActivate: [AppRouteGuard] },                    
                    { path: 'expense', component: ExpensesComponent, data: { permission: 'Pages.System.Revenue.View'} , canActivate: [AppRouteGuard] },
                    { path: 'expense/create', component: CreateExpensesComponent, data: { permission: 'Pages.System.Revenue.Add'} , canActivate: [AppRouteGuard] },
                    { path: 'expense/edit/:id', component: EditCustomerComponent, data: { permission: 'Pages.System.Revenue.Update'} , canActivate: [AppRouteGuard] },
                    { path: 'expense/detail/:id', component: DetailExpensesComponent, data: { permission: 'Pages.System.Revenue.View'} , canActivate: [AppRouteGuard] },     
                    { path: 'retail', component: RetailComponent, data: { permission: 'Pages.System.Revenue.View'} , canActivate: [AppRouteGuard] },
                    { path: 'retail/create', component: CreateRetailComponent, data: { permission: 'Pages.System.Revenue.Add'} , canActivate: [AppRouteGuard] },
                    { path: 'expense/edit/:id', component: EditCustomerComponent, data: { permission: 'Pages.System.Revenue.Update'} , canActivate: [AppRouteGuard] },
                    { path: 'retail/detail/:id', component: RetailDetailComponent, data: { permission: 'Pages.System.Revenue.View'} , canActivate: [AppRouteGuard] },
                    { path: 'upload', component: UploadComponent, data: { permission: 'Pages.System.Revenue.View'} , canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
