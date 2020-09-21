import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasDetalhesComponent } from './vagas-detalhes.component';

describe('JobDescriptionComponent', () => {
  let component: VagasDetalhesComponent;
  let fixture: ComponentFixture<VagasDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagasDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagasDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
