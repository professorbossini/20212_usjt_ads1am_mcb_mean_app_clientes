import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  // clientes = [
  //   {
  //     nome: 'Caio',
  //     fone: '12345678',
  //     email: 'caio@email.com',
  //   },
  //   {
  //     nome: 'Ana',
  //     fone: '23456789',
  //     email: 'ana@email.com',
  //   },
  // ]

  @Input() clientes: Cliente[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
