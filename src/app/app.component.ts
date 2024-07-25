import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators as RxWebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Wishing-Well-Frontend';
  public form!: FormGroup;
  public listCategory: string[] = ['เครื่องใช้ในบ้าน', 'สวนและการเกษตร', 'เสื้อผ้า', 'ไอที', 'สัตว์เลี้ยง', 'กีฬาและกิจกรรม', 'เครื่องประดับ', 'อาหารและเครื่องดื่ม', 'เครื่องเขียน', 'หนังสือ'];
  public overlayVisible = false;
  public products: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.initForm();
    this.products = [{
      _id: '669f85455163865e335f8109',
      name: 'ต้นไม้เลี้ยงน้ำ(จำนวน 1 ต้น) ช่วยฟอกอากาศ สามารถเลี้ยงกับน้ำได้ พลูด่าง หลากหลายแบบ',
      price: 49,
      amount: 99,
      category: 'สวนและเกษตร',
      detail: "คุณสมบัติ\n-สามารถเลี้ยงกับน้ำได้\n-เป็นไม้ฟอกอากาศ\n-เลี้ยงในที่ร่มหรือแดดรำไร\n-ทนทานต่อโรค\n-ดูแลง่าย\nการดูแล\n-สามารถเลี้ยงกับน้ำ หรือ นำไปปลูกในกระถางด้วย ขุยมะพร้าว  และมะพร้าวสับ\n-ใส่ปุ๋ยบำรุงใบทั่วไปของไม้ใบ ได้ทั้งแบบเม็ดและแบบน้ำ\n(ในช่วงแรกเมื่อได้รับสินค้ายังไม่ต้องให้ปุ๋ย เลี้ยงไปประมาณ 1 เดือน หรือสังเกตว่ามีรากใหม่ของต้นออกแล้ว\n ค่อยใส่หลังจากนั้น เว้นแต่ปุ๋ยที่พืชสามารถดูดซึมได้เลย)",
      merchant: "Khemthis_shop88",
      image: "https://down-th.img.susercontent.com/file/ff77243dccddac49019bd758238de8c4",
    }]
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
    // return `คุณสมบัติ\n-สามารถเลี้ยงกับน้ำได้\n-เป็นไม้ฟอกอากาศ\n-เลี้ยงในที่ร่มหรือแดดรำไร\n-ทนทานต่อโรค\n-ดูแลง่าย\nการดูแล\n-สามารถเลี้ยงกับน้ำ หรือ นำไปปลูกในกระถางด้วย ขุยมะพร้าว  และมะพร้าวสับ\n-ใส่ปุ๋ยบำรุงใบทั่วไปของไม้ใบ ได้ทั้งแบบเม็ดและแบบน้ำ\n(ในช่วงแรกเมื่อได้รับสินค้ายังไม่ต้องให้ปุ๋ย เลี้ยงไปประมาณ 1 เดือน หรือสังเกตว่ามีรากใหม่ของต้นออกแล้ว\n ค่อยใส่หลังจากนั้น เว้นแต่ปุ๋ยที่พืชสามารถดูดซึมได้เลย`.replace(/\n/g, '<br>');
    return detail.replace(/\n/g, '<br>');
  }
  public async searchProduct() {
    // this.overlayVisible = true;
    for (const prop in this.form.controls) {
      if (this.form.controls.hasOwnProperty(prop)) {
        this.form.controls[prop].markAsTouched();
        this.form.controls[prop].updateValueAndValidity();
      }
    }
    if(this.form.valid){
      await this.search();
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }

    this.products = [{
      _id: '669f85455163865e335f8109',
      name: 'ต้นไม้เลี้ยงน้ำ(จำนวน 1 ต้น) ช่วยฟอกอากาศ สามารถเลี้ยงกับน้ำได้ พลูด่าง หลากหลายแบบ',
      price: 49,
      amount: 99,
      category: 'สวนและเกษตร',
      detail: "คุณสมบัติ\n-สามารถเลี้ยงกับน้ำได้\n-เป็นไม้ฟอกอากาศ\n-เลี้ยงในที่ร่มหรือแดดรำไร\n-ทนทานต่อโรค\n-ดูแลง่าย\nการดูแล\n-สามารถเลี้ยงกับน้ำ หรือ นำไปปลูกในกระถางด้วย ขุยมะพร้าว  และมะพร้าวสับ\n-ใส่ปุ๋ยบำรุงใบทั่วไปของไม้ใบ ได้ทั้งแบบเม็ดและแบบน้ำ\n(ในช่วงแรกเมื่อได้รับสินค้ายังไม่ต้องให้ปุ๋ย เลี้ยงไปประมาณ 1 เดือน หรือสังเกตว่ามีรากใหม่ของต้นออกแล้ว\n ค่อยใส่หลังจากนั้น เว้นแต่ปุ๋ยที่พืชสามารถดูดซึมได้เลย)",
      merchant: "Khemthis_shop88",
      image: "https://down-th.img.susercontent.com/file/ff77243dccddac49019bd758238de8c4",
    }]
  }
  public identify(index: number, product: any){
    return product.name;
  }

  private search() {
    const body = this.form.value;
    body.query = body.query?.replace(/[\n\r]/g,' ').trim();
    // return this.http.post('https://wishing-well-backend.herokuapp.com/api/product/search', body)
  }
}
