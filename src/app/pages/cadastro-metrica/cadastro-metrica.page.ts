import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-metrica',
  templateUrl: './cadastro-metrica.page.html',
  styleUrls: ['./cadastro-metrica.page.scss'],
  standalone: false
})
export class CadastroMetricaPage {
  usuario: any = null;

  metrica = {
    titulo: '',
    valor: null,
    data_hora: ''
  };

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    const user = localStorage.getItem('usuario');
    if (!user) {
      this.navCtrl.navigateRoot('/login');
    } else {
      this.usuario = JSON.parse(user);
    }
  }

  salvar() {
    if (!this.metrica.titulo || !this.metrica.valor || !this.metrica.data_hora) {
      this.showToast('Preencha todos os campos');
      return;
    }

    const payload = {
      ...this.metrica,
      usuario_id: this.usuario.id
    };

    this.http.post('http://localhost:3000/metricas', payload).subscribe({
      next: () => {
        this.showToast('Métrica salva com sucesso', 'success');
        this.metrica = { titulo: '', valor: null, data_hora: '' };
      },
      error: () => this.showToast('Erro ao salvar métrica'),
    });
  }

  logout() {
    localStorage.removeItem('usuario');
    this.navCtrl.navigateRoot('/login');
  }

  async showToast(msg: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
