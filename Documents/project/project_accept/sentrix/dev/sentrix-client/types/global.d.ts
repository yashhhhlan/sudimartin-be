declare global {
  interface Window {
    trends?: {
      embed?: {
        renderExploreWidget: (type: string, config: any, options: any, container?: HTMLElement) => void;
        renderExploreWidgetTo: (container: HTMLElement, type: string, config: any, options: any) => void;
      };
    };
  }
}

export {};
