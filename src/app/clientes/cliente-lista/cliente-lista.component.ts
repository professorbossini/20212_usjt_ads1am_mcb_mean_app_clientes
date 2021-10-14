import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  private clientesSubscription: Subscription

  // private clienteService: ClienteService;
  // constructor(clienteService: ClienteService){
  //   this.clienteService = clienteService
  // }
  constructor(private clienteService: ClienteService){

  }


  ngOnInit(): void {
    //this.clientes = this.clienteService.getClientes()
    this.clienteService.getClientes();
    this.clientesSubscription = this.clienteService
    .getListaClientesAtualizadaObservable()
    .subscribe((clientes: Cliente[]) => {
      this.clientes = clientes
    })
  }

  ngOnDestroy(): void{
    this.clientesSubscription.unsubscribe()
  }

  onDelete(id: string) {
    this.clienteService.removerCliente(id);
  }

}
