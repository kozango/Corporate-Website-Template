export class Header {
  private header: HTMLElement;
  private menuButton: HTMLElement;
  private menuContent: HTMLElement;
  private overlay: HTMLElement;
  private closeButton: HTMLElement;
  private isOpen = false;

  constructor() {
    this.header = document.querySelector('[data-header]')!;
    this.menuButton = document.querySelector('[data-menu-button]')!;
    this.menuContent = document.querySelector('[data-menu-content]')!;
    this.overlay = this.menuContent.nextElementSibling as HTMLElement;
    this.closeButton = this.menuContent.querySelector('button')!;
    
    this.initializeScrollHandler();
    this.initializeMenuHandler();
    this.initializeNavigationHandler();
  }

  private initializeScrollHandler() {
    const handleScroll = () => {
      if (this.header) {
        const scrolled = window.scrollY > 20;
        this.header.classList.toggle('bg-white/80', scrolled);
        this.header.classList.toggle('backdrop-blur-md', scrolled);
        this.header.classList.toggle('shadow-sm', scrolled);
        this.header.classList.toggle('dark:bg-gray-900/80', scrolled);
        this.header.classList.toggle('bg-white', !scrolled);
        this.header.classList.toggle('dark:bg-gray-900', !scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // 初期状態の設定
    handleScroll();
  }

  private initializeMenuHandler() {
    const toggleMenu = () => {
      this.isOpen = !this.isOpen;
      
      // メニューコンテンツのアニメーション
      this.menuContent.classList.toggle('opacity-0', !this.isOpen);
      this.menuContent.classList.toggle('translate-x-full', !this.isOpen);
      this.menuContent.classList.toggle('pointer-events-none', !this.isOpen);
      
      // オーバーレイのアニメーション
      this.overlay.classList.toggle('opacity-0', !this.isOpen);
      this.overlay.classList.toggle('pointer-events-none', !this.isOpen);
      
      // ハンバーガーメニューのアニメーション
      const [top, middle, bottom] = this.menuButton.querySelectorAll('span');
      if (this.isOpen) {
        top.classList.replace('rotate-0', 'rotate-45');
        top.classList.replace('top-1', 'top-3');
        middle.classList.replace('opacity-100', 'opacity-0');
        bottom.classList.replace('rotate-0', '-rotate-45');
        bottom.classList.replace('top-5', 'top-3');
      } else {
        top.classList.replace('rotate-45', 'rotate-0');
        top.classList.replace('top-3', 'top-1');
        middle.classList.replace('opacity-0', 'opacity-100');
        bottom.classList.replace('-rotate-45', 'rotate-0');
        bottom.classList.replace('top-3', 'top-5');
      }
      
      // スクロールロック
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    };

    // メニューボタンのクリックイベント
    this.menuButton.addEventListener('click', toggleMenu);
    
    // バツボタンのクリックイベント
    this.closeButton.addEventListener('click', () => {
      if (this.isOpen) toggleMenu();
    });
    
    // オーバーレイのクリックイベント
    this.overlay.addEventListener('click', () => {
      if (this.isOpen) toggleMenu();
    });
  }

  private initializeNavigationHandler() {
    // ページ遷移時の処理
    document.addEventListener('astro:page-load', () => {
      if (this.isOpen) {
        this.isOpen = false;
        this.menuContent.classList.add('opacity-0', 'translate-x-full', 'pointer-events-none');
        this.overlay.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
      }
    });
  }
}

// 初期化
document.addEventListener('astro:load', () => {
  new Header();
});
