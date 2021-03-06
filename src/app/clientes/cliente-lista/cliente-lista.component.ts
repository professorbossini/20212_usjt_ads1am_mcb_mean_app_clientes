import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  private clientesSubscription: Subscription
  public estaCarregando: boolean = false
  public totalDeClientes: number = 0
  public totalDeClientesPorPagina: number = 2
  public opcoesTotalDeClientesPorPagina: number[] = [2, 3, 5, 10]
  public paginaAtual: number = 1

  // private clienteService: ClienteService;
  // constructor(clienteService: ClienteService){
  //   this.clienteService = clienteService
  // }
  constructor(private clienteService: ClienteService){

  }


  ngOnInit(): void {

    this.estaCarregando = true
    //this.clientes = this.clienteService.getClientes()
    this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
    this.clientesSubscription = this.clienteService
    .getListaClientesAtualizadaObservable()
    .subscribe((dados: {clientes: [], maxClientes: number}) => {
      this.estaCarregando = false
      this.clientes = dados.clientes
      this.totalDeClientes = dados.maxClientes
    })
  }

  ngOnDestroy(): void{
    this.clientesSubscription.unsubscribe()
  }

  onDelete(id: string) {
    this.estaCarregando = true
    this.clienteService.removerCliente(id)
    .subscribe(() => {
      this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual)
    })
  }

  onPaginaAlterada (dadosPagina: PageEvent){
    this.estaCarregando = true
    this.paginaAtual = dadosPagina.pageIndex + 1
    this.totalDeClientesPorPagina = dadosPagina.pageSize
    this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
  }

}
