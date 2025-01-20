import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todo',
  standalone: true
})
export class TodoPipe implements PipeTransform {

  transform(dueDate: string): string {
    const currentDate = new Date();
    const todoDate = new Date(dueDate);

    // Calculer la différence en millisecondes
    const timeDifference = todoDate.getTime() - currentDate.getTime();

    // Convertir en jours
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    // Vérifier si la date est dans les 2 jours suivants
    if (daysDifference <= 2 && daysDifference >= 0) {
      return 'todo-due-soon'; // Classe CSS pour styliser le todo
    }

    return ''; // Pas de classe CSS si la date ne répond pas au critère
  }
}
