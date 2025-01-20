import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTodo]',
  standalone: true
})
export class TodoDirective {

  private defaultShadow = 'none'; // Ombre par défaut
  private hoverShadow = '5px 5px 10px 2px rgba(0,0,0,.5)'; // Ombre au survol

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Méthode pour définir ou supprimer l'ombre
  private setShadow(shadow: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', shadow);
  }

  // Appliquer une ombre lorsque la souris entre dans l'élément
  @HostListener('mouseenter') onMouseEnter(): void {
    this.setShadow(this.hoverShadow);
  }

  // Retirer l'ombre lorsque la souris quitte l'élément
  @HostListener('mouseleave') onMouseLeave(): void {
    this.setShadow(this.defaultShadow);
  }

}
