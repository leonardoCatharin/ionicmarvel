import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { CharacterService } from './../provider/character.service';
import { PaginationComponent } from '../util/pagination/pagination.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public characters : any=[];
    
  public filtro   = { 
      descricao   : '',
      bkp         : ''
  };
    
  public filtroCtrl : FormControl;
  public pagination = new PaginationComponent();
  public checking   = true;

  constructor(private characterService: CharacterService, private navCtrl: NavController) {
    this.filtroCtrl = new FormControl();
    this.pagination.setLimit(10);

    this.initFilter();

  }

  /* *INICIALIZA FILTRO */
  private initFilter() {
    // this.filtroCtrl.valueChanges.debounceTime(750).subscribe((filtro) => {
        this.getAllCharacters();
    // });
  }

  /* *RECUPERA PERSONAGENS */
  public getAllCharacters(){
      this.checking = true;

      if(this.filtro.descricao != this.filtro.bkp){
          this.pagination.reset();
      }

      this.characterService.getAllCharacters(this.pagination, this.filtro.descricao).then((characters) => {
          this.filtro.bkp = this.filtro.descricao;
          this.characters = [];
          this.characters = characters;
          this.checking = false;
      });
  }

  /* PAGINATION */
  public goFirstPage(){
      this.pagination.setCurrentPage(1);
      this.getAllCharacters();
  }

  public goLastPage(){
      this.pagination.setCurrentPage(this.pagination.getPages()[this.pagination.getPages().length - 1]);
      this.getAllCharacters();
  }

  public goPreviousPage(){
      this.pagination.setCurrentPage(this.pagination.getCurrentPage() - 1);
      this.getAllCharacters();
  }

  public goNextPage(){
      this.pagination.setCurrentPage(this.pagination.getCurrentPage() + 1);
      this.getAllCharacters();
  }

  public goPage(page: number){
      this.pagination.setCurrentPage(page);
      this.getAllCharacters();
  }
  /* --- */

  public goDetails(character: any){
      // this.navCtrl.push(Detail, {character: character});
  }   

}
