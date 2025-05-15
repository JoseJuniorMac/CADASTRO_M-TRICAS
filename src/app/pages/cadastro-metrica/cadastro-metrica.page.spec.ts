import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroMetricaPage } from './cadastro-metrica.page';

describe('CadastroMetricaPage', () => {
  let component: CadastroMetricaPage;
  let fixture: ComponentFixture<CadastroMetricaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroMetricaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
