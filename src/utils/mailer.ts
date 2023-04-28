import { createTransport, Transporter, SendMailOptions } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { logger } from '@utils/logger';
import { TemplateEngine } from './templateEngine';

export class Mailer {
  private transporter: Transporter;
  private templateEngine: TemplateEngine;

  constructor(config: SMTPTransport.Options) {
    this.transporter = createTransport(config);
    this.templateEngine = new TemplateEngine();
  }

  public async sendMail(mailOptions: SendMailOptions): Promise<boolean> {
    return this.transporter
      .sendMail(mailOptions)
      .then(() => true)
      .catch((error) => {
        logger.warn('🧯 🔥 ~ Mailer ~ sendMail ~ error', error);
        return false;
      });
  }

  public renderTemplate(template: string, data: Record<string, unknown>): string {
    return this.templateEngine.render(template, data);
  }

  public close(): void {
    return this.transporter.close();
  }
}
