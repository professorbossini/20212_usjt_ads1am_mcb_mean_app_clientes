import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
    selector: 'app-cliente-inserir',
    templateUrl: './cliente-inserir.component.html',
    styleUrls: ['./cliente-inserir.component.css']
})
export class ClienteInserirComponent implements OnInit {

  private modo: string = "criar";
  private idCliente: string
  public cliente: Cliente
  public estaCarregando: boolean = false
  form: FormGroup

  constructor(
    private clienteService: ClienteService,
    public route: ActivatedRoute
  ){

  }

  ngOnInit(): void{
    this.form = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      fone: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      imagem: new FormControl (null, {
        validators: [Validators.required]
      })
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idCliente')){
        this.modo = "editar"
        this.idCliente = paramMap.get("idCliente")
        this.estaCarregando = true
        //this.cliente = this.clienteService.getCliente(this.idCliente)
        this.clienteService.getCliente(this.idCliente)
        .subscribe(dadosCliente => {
          this.estaCarregando = false
          this.cliente = {
            id: dadosCliente._id,
            nome: dadosCliente.nome,
            fone: dadosCliente.fone,
            email: dadosCliente.email
          };
          this.form.setValue({
            nome: this.cliente.nome,
            fone: this.cliente.fone,
            email: this.cliente.email
          })
        });
      }
      else{
        this.modo = "criar"
        this.idCliente = null
      }
    })
  }
  onSalvarCliente(){
    if (this.form.invalid) return;
    this.estaCarregando = true
    if (this.modo === "criar") {
      this.clienteService.adicionarCliente(
        this.form.value.nome,
        this.form.value.fone,
        this.form.value.email
      );
    }
    else {
      this.clienteService.atualizarCliente(
        this.idCliente,
        this.form.value.nome,
        this.form.value.fone,
        this.form.value.email
      )
    }
    this.form.reset();
  }

  onImagemSelecionada (event: Event){
    const arquivo = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({'imagem': arquivo})
    this.form.get('imagem').updateValueAndValidity()
    console.log(arquivo)
    console.log(this.form)
  }
}
