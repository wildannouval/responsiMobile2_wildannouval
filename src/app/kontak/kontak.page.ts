import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

const USERNAME = 'namasaya';
@Component({
  selector: 'app-kontak',
  templateUrl: './kontak.page.html',
  styleUrls: ['./kontak.page.scss'],
})
export class KontakPage implements OnInit {
  public nama='';
  dataKontak: any = [];
  modal_tambah = false;
  modal_edit = false;
  id: any;
  nama_kontak: any;
  nomor_kontak:any;

  constructor( public _apiService: ApiService, private modal:ModalController,private authService: AuthenticationService,private alertController: AlertController, private router: Router) {
    
  }

  ngOnInit() {
    this.getKontak();
    this.cekSesi();
    console.log(this.nama);
  }

  async cekSesi() {
    const ambilNama = localStorage.getItem(USERNAME);
    if (ambilNama) {
      let namauser = ambilNama;
      this.nama = namauser;
    } else {
      this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }

  logout(){
    this.alertController.create({
      header: 'Perhatian',
      subHeader: 'Yakin Logout Aplikasi ?',
      buttons: [{
        text: 'Batal',
        handler: (data: any) => {
          console.log('Canceled',data);
        }
      },
      {
        text: 'Yakin',
        handler: (data: any) => {
          this.authService.logout();
          this.router.navigateByUrl('/',{replaceUrl:true});
        }
      }
      ]
    }).then(res=> {
      res.present();
    })
  }

  getKontak() {
    this._apiService.tampil('tampilKontak.php').subscribe({
    next: (res: any) => {
    console.log('sukses', res);
    this.dataKontak = res;
    },
    error: (err: any) => {
    console.log(err);
    },
    })
    }
    
    reset_model() {
      this.id = null;
      this.nama_kontak = '';
      this.nomor_kontak = '';
      }
      open_modal_tambah(isOpen: boolean) {
        this.modal_tambah = isOpen;
        this.reset_model();
        this.modal_tambah = true;
        this.modal_edit = false;
      }
      open_modal_edit(isOpen: boolean, idget: any) {
        this.modal_edit = isOpen;
        this.id = idget;
        console.log(this.id);
        this.ambilKontak(this.id);
        this.modal_tambah = false;
        this.modal_edit = true;
        }
        
      cancel() {
      this.modal.dismiss();
      this.modal_tambah = false;
      this.reset_model();
      }

      tambahKontak() {
        if (this.nama_kontak != '' && this.nomor_kontak != '') {
        let data = {
        nama_kontak: this.nama_kontak,
        nomor_kontak: this.nomor_kontak,
        }
        this._apiService.tambah(data, '/tambahKontak.php')
        .subscribe({
        next: (hasil: any) => {
        this.reset_model();
        console.log('berhasil tambah kontak');
        this.getKontak();
        this.modal_tambah = false;
        this.modal.dismiss();
        },
        error: (err: any) => {
        console.log('gagal tambah kontak');
        }
        })
        } else {
        console.log('gagal tambah kontak karena masih ada data yg kosong');
        }
        }

        hapusKontak(id: any) {
          this._apiService.hapus(id, 
          '/hapusKontak.php?id=').subscribe({
          next: (res: any) => {
          console.log('sukses', res);
          this.getKontak();
          console.log('berhasil hapus data');
          },
          error: (error: any) => {
          console.log('gagal');
          }
          })
          }

          ambilKontak(id: any) {
            this._apiService.lihat(id, 
            '/lihatKontak.php?id=').subscribe({
            next: (hasil: any) => {
            console.log('sukses', hasil);
            let kontak = hasil;
            this.id = kontak.id;
            this.nama_kontak = kontak.nama_kontak;
            this.nomor_kontak = kontak.nomor_kontak;
            },
            error: (error: any) => {
            console.log('gagal ambil data');
            }
            })
            }
              editKontak() {
                let data = {
                id: this.id,
                nama_kontak: this.nama_kontak,
                nomor_kontak: this.nomor_kontak
                }
                this._apiService.edit(data, '/editKontak.php')
                .subscribe({
                next: (hasil: any) => {
                console.log(hasil);
                this.reset_model();
                this.getKontak();
                console.log('berhasil edit Kontak');
                this.modal_edit = false;
                this.modal.dismiss();
                },
                error: (err: any) => {
                console.log('gagal edit Kontak');
                }
                })
                }
}
