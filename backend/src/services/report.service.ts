import { reportRepository, ReportRepository, ReportFilterOptions } from '../repositories/report.repository';

export class ReportService {
  private reportRepo: ReportRepository;

  constructor(repo = reportRepository) {
    this.reportRepo = repo;
  }

  async getSalesReport(filter: ReportFilterOptions) {
    return this.reportRepo.getSalesReport(filter);
  }

  async getLeadReport(filter: ReportFilterOptions) {
    return this.reportRepo.getLeadReport(filter);
  }

  async getPerformanceReport(filter: ReportFilterOptions) {
    return this.reportRepo.getPerformanceReport(filter);
  }
}

export const reportService = new ReportService();
