import { CharacterService } from './../../provider/character.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage {
  /* id para testes: 1011334 */

  public character = {
    id: 0,
    comics: {
        available: 0, 
        collectionURI: '', 
        items: [], 
        returned: 0
    },
    description: '',
    events: {
        available: 0, 
        collectionURI: '', 
        items: [], 
        returned: 0
    },
    modified: '',
    name: '',
    resourceURI: '',
    series: {
        available: 0, 
        collectionURI: '', 
        items: [], 
        returned: 0
    },
    stories: {
        available: 0, 
        collectionURI: '', 
        items: [], 
        returned: 0
    },
    thumbnail: {
        path: '', 
        extension: ''
    },
    urls : []
}

  public comics    : any=[];
  public id        : number;

  public checking  = true;

  constructor(private characterService: CharacterService, 
              private route: ActivatedRoute) { 
    /* recebimento de objetos por parâmetro */
    this.route.queryParams.subscribe(params => {
      this.character = params['character'];
    });
  }


  /* recupera os hqs do personagem */
  public getComicsByCharacter(){
    this.checking = true;

    this.characterService.getComicsByCharacter(this.character).then((comics) => {
        this.comics   = comics;
        this.checking = false;
    });
  }
}
