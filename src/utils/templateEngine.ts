import * as Mustache from 'mustache';

export class TemplateEngine {
  private engine: typeof Mustache;

  constructor() {
    this.engine = Mustache;
  }

  public render(template: string, data: Record<string, unknown>): string {
    return this.engine.render(template, data);
  }
}
