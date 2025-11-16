// google-trends-api の型定義
declare module 'google-trends-api' {
  interface RelatedQueriesOptions {
    keyword: string;
    geo?: string;
    hl?: string;
    timezone?: number;
    startTime?: Date;
    endTime?: Date;
    category?: number;
  }

  interface DailyTrendsOptions {
    geo?: string;
    hl?: string;
    timezone?: number;
    trendDate?: Date;
  }

  interface RealTimeTrendsOptions {
    geo: string;
    hl?: string;
    timezone?: number;
    category?: string;
  }

  const googleTrends: {
    relatedQueries(options: RelatedQueriesOptions): Promise<string>;
    interestOverTime(options: RelatedQueriesOptions): Promise<string>;
    dailyTrends(options: DailyTrendsOptions): Promise<string>;
    realTimeTrends(options: RealTimeTrendsOptions): Promise<string>;
  };

  export default googleTrends;
}
