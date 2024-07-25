import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators as RxWebValidators } from '@rxweb/reactive-form-validators';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Wishing-Well-Frontend';
  public form!: FormGroup;
  public listCategory: string[] = ['เครื่องใช้ในบ้าน', 'สวนและการเกษตร', 'เสื้อผ้า', 'ไอที'];
  public overlayVisible = false;
  public products: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.initForm();
  }


  private initForm(): void {
    this.form = this.formBuilder.group({
      maxPrice: ['', [RxWebValidators.required(), RxWebValidators.minNumber({ value: 0 })]],
      category: ['', [RxWebValidators.required(), RxWebValidators.minLength({ value: 1 })]],
      query: ['', [RxWebValidators.required(), RxWebValidators.minLength({ value: 1 })]],
    });
  }

  public checkFormInValid(formCheck: FormGroup, name: string) {
    return formCheck.controls[name].invalid && (formCheck.controls[name].dirty || formCheck.controls[name].touched);
  }

  public replaceNewLine(detail: string) {
    return detail.replace(/\n/g, '<br>');
  }
  public async searchProduct() {
    for (const prop in this.form.controls) {
      if (this.form.controls.hasOwnProperty(prop)) {
        this.form.controls[prop].markAsTouched();
        this.form.controls[prop].updateValueAndValidity();
      }
    }
    if(this.form.valid){
      this.products = [];
      this.products =  await this.search();
      this.overlayVisible = false;
    }
  }
  public identify(index: number, product: any){
    return product.name;
  }

  private search(): Promise<any> {
    this.overlayVisible = true;
    const body = this.form.value;
    body.query = body.query?.replace(/[\n\r]/g,' ').trim();
    // return this.http.post(environment.app_url + '/search-query', body).pipe()
    return new Promise((resolve, reject) => {
      this.http.post(environment.app_url + '/search-query', body)
      .subscribe({
        next: data => {
          this.overlayVisible = false;
          resolve(data);
        },
        error: error => {
            this.overlayVisible = false;
            console.error('There was an error!', error);
            reject(error);
        }
      })

    });
  }
}
