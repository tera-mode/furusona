import { seasonalRecommendationTemplate } from './seasonal';
import { limitReminderTemplate } from './limit-reminder';
import { yearEndRushTemplate } from './year-end';
import { taxReminderTemplate } from './tax-reminder';
import { EmailTemplate } from '@/types/email';

export const EMAIL_TEMPLATES: Record<string, Omit<EmailTemplate, 'createdAt' | 'updatedAt'>> = {
  seasonal_recommendation: seasonalRecommendationTemplate,
  limit_reminder: limitReminderTemplate,
  year_end_rush: yearEndRushTemplate,
  tax_reminder: taxReminderTemplate,
};

export function getTemplate(templateId: string): Omit<EmailTemplate, 'createdAt' | 'updatedAt'> | undefined {
  return EMAIL_TEMPLATES[templateId];
}

export function getAllTemplates(): Array<Omit<EmailTemplate, 'createdAt' | 'updatedAt'>> {
  return Object.values(EMAIL_TEMPLATES);
}
