class Carousel {
      private container: HTMLElement;
      private items: HTMLElement[];
      private currentIndex: number;

      constructor(container: HTMLElement) {
            this.container = container;
            this.items = Array.from(container.children) as HTMLElement[];
            this.currentIndex = 0;

            this.setup();
      }

      private setup() {
            const prevButton = document.querySelector('.carousel-prev');
            const nextButton = document.querySelector('.carousel-next');

            prevButton?.addEventListener('click', () => this.slideToPrev());
            nextButton?.addEventListener('click', () => this.slideToNext());
      }

      private slideToPrev() {
            if (this.currentIndex > 0) {
                  this.currentIndex--;
                  this.updatePosition();
            }
      }

      private slideToNext() {
            if (this.currentIndex < this.items.length - 1) {
                  this.currentIndex++;
                  this.updatePosition();
            }
      }

      private updatePosition() {
            const itemWidth = this.items[0].offsetWidth;
            const newPosition = -itemWidth * this.currentIndex;
            this.container.style.transform = `translateX(${newPosition}px)`;
      }
}

export default Carousel;
