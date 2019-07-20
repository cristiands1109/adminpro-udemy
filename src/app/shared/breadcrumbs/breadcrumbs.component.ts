import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( private routes: Router, private title: Title, private meta: Meta) {

    this.getDataRoute()
    .subscribe( event => {
      // console.log(event);
      this.titulo = event.tiutlo;
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: 'Desccripción',
        content: this.titulo
      };
      this.meta.updateTag(metaTag);




    });
  }

  ngOnInit() {

  }

  getDataRoute() {
    return this.routes.events.pipe(
      filter(event => event instanceof ActivationEnd  ),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd ) => event.snapshot.data )
      );
  }

}
