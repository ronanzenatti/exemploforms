import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Usuario } from '../models/Usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Ionic Storage: https://ionicframework.com/docs/angular/storage

  // mais detalhes: http://www.fabricadecodigo.com/como-armazenar-dados-offline-com-ionic-storage/

  constructor(private storage: Storage) {
    /** 
   * O storage trabalha com SQLite e IndexedDB
   * 
   * IndexedDB -> Para guardar dados nos navegadores
   * SQLite -> Para guardar dados nos smartphones
   * 
   * Para haver compatibilidade entre os dois, o Storage trabalha com o padrão chave/valor
   * 
   * Chave primária do projeto -> E-mail
   */
  }

  //CRUD
  public async salvar(usuario: Usuario) {
    if (usuario.email) {
      await this.storage.set(usuario.email, usuario);
      return true;
    } else {
      return false;
    }
  }

  public async busca(email) {
    let usuario: Usuario;
    await this.storage.get(email).then(valor => {
      usuario = valor;
    });
    return usuario;
  }

  public async buscarTodos() {
    let usuarios = [];
    return await this.storage.forEach((valor, chave, i) => {
      usuarios.push(valor);
    }).then(() => {
      return usuarios;
    }).catch(() => {
      usuarios = [];
    });
  }

  public async excluir(email) {
    return await this.storage.remove(email);
  }

  public async login(email: string, senha: string) {
    let usuario: Usuario;
    await this.storage.get(email).then(valor => {
      if (valor && valor.senha == senha) {
        usuario = valor;
      } else {
        usuario = null;
      }
    });
    return usuario;
  }

}
