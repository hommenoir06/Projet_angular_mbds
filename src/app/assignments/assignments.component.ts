import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
// Importation des directives custom
import { FormsModule } from '@angular/forms';
import { NonRenduDirective } from '../shared/non-rendu.directive';
import { RenduDirective } from '../shared/rendu.directive';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';


import { RouterLink } from '@angular/router';

import { Assignment } from './assignment.model';

import { AssignmentsService } from '../shared/assignments.service';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';

// Composant qui gère l'affichage d'une liste de devoirs (assignments)
@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RenduDirective, NonRenduDirective,
    MatListModule, MatButtonModule, RouterLink, MatInputModule,
    MatFormFieldModule, MatSliderModule, FormsModule, MatTableModule,
    AssignmentDetailComponent, AddAssignmentComponent, MatPaginatorModule
  ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  titre = "Liste des devoirs à faire :";
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu'];
  pageSizeOptions = [5, 10, 25, 50, 100];

  assignments: Assignment[] = [];
  totalDocs =0;
  limit = 10;
  page = 1;
  totalPages = 0;
  pagingCounter = 0;
  hasPrevPage= false
  hasNextPage = false;
  prevPage = 0;
  nextPage = 0;

  currentUser: string | null;

  constructor(private assignmentsService: AssignmentsService, private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    console.log("AVANT AFFICHAGE, on demande au service les données !");

    this.getAssignments();
  }

  getAssignments() {
    // on va initialiser le tableau avec des données
    this.assignmentsService.getAssignments(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
        // on initialise les propriétés en fonction des résultats reçus
        this.totalDocs = data.totalDocs;
        this.limit = data.limit;
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.pagingCounter = data.pagingCounter;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.prevPage = data.prevPage;
        this.nextPage = data.nextPage;

        console.log("Dans le subscribe, données reçues !")
      });
    console.log("APRES APPEL DU SERVICE !");
  }

  getColor(a: any) {
    if (a.rendu) {
      return 'green';
    } else {
      return 'red';
    }
  }

  pageSuivante() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAssignments();
    }
  }

  pagePrecedente() {
    if (this.page > 1) {
      this.page--;
      this.getAssignments();
    }
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  // Pour le paginator
  handlePageEvent(e: PageEvent) {
    //this.pageEvent = e;
    //this.totalPages = e.length;
    this.limit = e.pageSize;
    this.page = e.pageIndex+1;

    console.log("Dans handlePageEvent, page=" + this.page + " limit=" + this.limit)
    this.getAssignments();

  }
}
