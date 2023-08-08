import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {

  productId: number;
  product: Product;
  editProductFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService) {}
    
  ngOnInit(): void {
    this.generateForm();
    
    this.route.params.subscribe(params => {
      this.productId = params['id'];
   });

//    this.editProductFormGroup.getNationalHoliday(this.id)
//    .subscribe((response) => {
//      this.fillForm(response);   
//    }
//  ); 
  }

  generateForm() {
    this.editProductFormGroup = this.formBuilder.group({
      brand: [{ value: ''}],
      model: [{ value: ''}],
      price: [{ value: ''}]
    });
  }

  fillForm(response: Product){
    this.editProductFormGroup.patchValue({
      date: response.brand,
      title: response.model,
      description: response.price
    });
  }

  updateProduct(){
    this.product = Object.assign({}, this.product, this.editProductFormGroup.value);
    this.product.id = this.productId;
    this.productService.post(this.product)
      .subscribe({
        next: () => { this.processSuccess() },
        error: error => { this.processError(error) }
      });
  }

  processSuccess() {
    let toast = this.toastr.success('Produto atualizado com sucesso!', 'Sucesso!', { timeOut: 2500 });
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/list']);
      });
    }
  }

  processError(error: HttpErrorResponse){
    this.toastr.error(error.message, 'Erro!');
  }
}