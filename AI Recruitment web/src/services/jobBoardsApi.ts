// Real LinkedIn & Indeed Job Data Integration
// This service fetches REAL job data from LinkedIn and Indeed via RapidAPI

interface JobSearchParams {
  query: string;
  location?: string;
  datePosted?: 'all' | 'today' | 'week' | 'month';
  jobType?: string;
  experienceLevel?: string;
  page?: number;
}

interface RealJobData {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  description: string;
  salary?: string;
  jobType: string[];
  postedDate: string;
  applyUrl: string;
  source: 'linkedin' | 'indeed' | 'glassdoor' | 'ziprecruiter';
  requirements?: string[];
  benefits?: string[];
}

class JobBoardsApiService {
  private rapidApiKey: string;
  private useRealData: boolean;

  constructor() {
    this.rapidApiKey = (import.meta as any).env?.VITE_RAPIDAPI_KEY || '';
    this.useRealData = (import.meta as any).env?.VITE_USE_REAL_DATA === 'true';
  }

  /**
   * Search jobs from multiple sources (LinkedIn, Indeed, Glassdoor)
   * Using JSearch API - Best option for multi-source search
   */
  async searchJobs(params: JobSearchParams): Promise<RealJobData[]> {
    if (!this.useRealData || !this.rapidApiKey) {
      console.warn('⚠️ Real data mode disabled or API key missing. Using fallback data.');
      return this.generateFallbackJobs(params);
    }

    try {
      console.log('🔍 Fetching REAL jobs from LinkedIn, Indeed, Glassdoor...');
      
      // Use JSearch API - aggregates multiple job boards
      const jobs = await this.fetchFromJSearch(params);
      
      console.log(`✅ Found ${jobs.length} REAL jobs from multiple sources`);
      return jobs;
      
    } catch (error) {
      console.error('❌ Error fetching real job data:', error);
      return this.generateFallbackJobs(params);
    }
  }

  /**
   * Fetch jobs from JSearch API (LinkedIn + Indeed + Glassdoor + ZipRecruiter)
   * This is the BEST option - one API for all sources!
   */
  private async fetchFromJSearch(params: JobSearchParams): Promise<RealJobData[]> {
    try {
      const url = new URL('https://jsearch.p.rapidapi.com/search');
      
      // Build search query
      url.searchParams.append('query', `${params.query} in ${params.location || 'United States'}`);
      url.searchParams.append('page', (params.page || 1).toString());
      url.searchParams.append('num_pages', '1');
      
      if (params.datePosted) {
        url.searchParams.append('date_posted', params.datePosted);
      }
      
      if (params.jobType) {
        url.searchParams.append('employment_types', params.jobType);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.rapidApiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`JSearch API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform JSearch response to our format
      return this.transformJSearchJobs(data.data || []);
      
    } catch (error) {
      console.error('JSearch API error:', error);
      throw error;
    }
  }

  /**
   * Fetch jobs directly from LinkedIn API
   */
  async searchLinkedInJobs(params: JobSearchParams): Promise<RealJobData[]> {
    if (!this.rapidApiKey) {
      return [];
    }

    try {
      console.log('🔗 Fetching REAL jobs from LinkedIn...');
      
      const url = new URL('https://linkedin-jobs-search.p.rapidapi.com/search');
      url.searchParams.append('keywords', params.query);
      url.searchParams.append('location', params.location || 'United States');
      url.searchParams.append('datePosted', params.datePosted || 'week');
      url.searchParams.append('sort', 'mostRelevant');

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.rapidApiKey,
          'X-RapidAPI-Host': 'linkedin-jobs-search.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`LinkedIn API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ Found ${data.length} REAL LinkedIn jobs`);
      
      return this.transformLinkedInJobs(data);
      
    } catch (error) {
      console.error('LinkedIn API error:', error);
      return [];
    }
  }

  /**
   * Fetch jobs directly from Indeed API
   */
  async searchIndeedJobs(params: JobSearchParams): Promise<RealJobData[]> {
    if (!this.rapidApiKey) {
      return [];
    }

    try {
      console.log('📋 Fetching REAL jobs from Indeed...');
      
      const url = new URL('https://indeed-jobs-search.p.rapidapi.com/search');
      url.searchParams.append('query', params.query);
      url.searchParams.append('location', params.location || 'United States');
      url.searchParams.append('page', (params.page || 1).toString());

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.rapidApiKey,
          'X-RapidAPI-Host': 'indeed-jobs-search.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`Indeed API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ Found ${data.jobs?.length || 0} REAL Indeed jobs`);
      
      return this.transformIndeedJobs(data.jobs || []);
      
    } catch (error) {
      console.error('Indeed API error:', error);
      return [];
    }
  }

  /**
   * Transform JSearch API response to our format
   */
  private transformJSearchJobs(jobs: any[]): RealJobData[] {
    return jobs.map(job => ({
      id: job.job_id || `jsearch_${Date.now()}_${Math.random()}`,
      title: job.job_title || 'Position Available',
      company: job.employer_name || 'Company',
      companyLogo: job.employer_logo || undefined,
      location: job.job_city && job.job_state 
        ? `${job.job_city}, ${job.job_state}` 
        : job.job_country || 'Remote',
      description: job.job_description || 'No description available',
      salary: this.formatSalary(job.job_min_salary, job.job_max_salary, job.job_salary_currency),
      jobType: this.parseJobType(job.job_employment_type),
      postedDate: this.formatDate(job.job_posted_at_datetime_utc),
      applyUrl: job.job_apply_link || job.job_google_link || '#',
      source: this.detectSource(job.job_publisher),
      requirements: this.extractRequirements(job.job_description),
      benefits: this.extractBenefits(job.job_highlights?.Benefits || [])
    }));
  }

  /**
   * Transform LinkedIn API response to our format
   */
  private transformLinkedInJobs(jobs: any[]): RealJobData[] {
    return jobs.map(job => ({
      id: job.id || `linkedin_${Date.now()}_${Math.random()}`,
      title: job.title || 'Position Available',
      company: job.company || 'Company',
      companyLogo: job.companyLogo || undefined,
      location: job.location || 'Remote',
      description: job.description || 'No description available',
      salary: job.salary || 'Competitive',
      jobType: [job.type || 'Full-time'],
      postedDate: this.formatDate(job.postedDate),
      applyUrl: job.url || '#',
      source: 'linkedin',
      requirements: this.extractRequirements(job.description),
      benefits: []
    }));
  }

  /**
   * Transform Indeed API response to our format
   */
  private transformIndeedJobs(jobs: any[]): RealJobData[] {
    return jobs.map(job => ({
      id: job.id || `indeed_${Date.now()}_${Math.random()}`,
      title: job.title || 'Position Available',
      company: job.company || 'Company',
      companyLogo: job.companyLogo || undefined,
      location: job.location || 'Remote',
      description: job.description || job.snippet || 'No description available',
      salary: job.salary || 'Competitive',
      jobType: [job.type || 'Full-time'],
      postedDate: this.formatDate(job.date),
      applyUrl: job.url || '#',
      source: 'indeed',
      requirements: this.extractRequirements(job.description || job.snippet),
      benefits: []
    }));
  }

  /**
   * Helper: Format salary range
   */
  private formatSalary(min?: number, max?: number, currency?: string): string {
    if (!min && !max) return 'Competitive';
    
    const curr = currency || 'USD';
    const symbol = curr === 'USD' ? '$' : curr === 'INR' ? '₹' : curr;
    
    if (min && max) {
      return `${symbol}${this.formatNumber(min)} - ${symbol}${this.formatNumber(max)}`;
    } else if (min) {
      return `${symbol}${this.formatNumber(min)}+`;
    } else if (max) {
      return `Up to ${symbol}${this.formatNumber(max)}`;
    }
    
    return 'Competitive';
  }

  /**
   * Helper: Format large numbers
   */
  private formatNumber(num: number): string {
    if (num >= 1000) {
      return `${Math.round(num / 1000)}k`;
    }
    return num.toString();
  }

  /**
   * Helper: Parse job type
   */
  private parseJobType(type?: string): string[] {
    if (!type) return ['Full-time'];
    
    const types: string[] = [];
    const typeLower = type.toLowerCase();
    
    if (typeLower.includes('full')) types.push('Full-time');
    if (typeLower.includes('part')) types.push('Part-time');
    if (typeLower.includes('contract')) types.push('Contract');
    if (typeLower.includes('intern')) types.push('Internship');
    if (typeLower.includes('remote')) types.push('Remote');
    
    return types.length > 0 ? types : ['Full-time'];
  }

  /**
   * Helper: Format date
   */
  private formatDate(dateString?: string): string {
    if (!dateString) return 'Recently';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      
      return date.toLocaleDateString();
    } catch {
      return 'Recently';
    }
  }

  /**
   * Helper: Detect job source from publisher
   */
  private detectSource(publisher?: string): 'linkedin' | 'indeed' | 'glassdoor' | 'ziprecruiter' {
    if (!publisher) return 'linkedin';
    
    const pub = publisher.toLowerCase();
    if (pub.includes('linkedin')) return 'linkedin';
    if (pub.includes('indeed')) return 'indeed';
    if (pub.includes('glassdoor')) return 'glassdoor';
    if (pub.includes('ziprecruiter')) return 'ziprecruiter';
    
    return 'linkedin';
  }

  /**
   * Helper: Extract requirements from description
   */
  private extractRequirements(description?: string): string[] {
    if (!description) return [];
    
    const requirements: string[] = [];
    const desc = description.toLowerCase();
    
    // Common requirements patterns
    const patterns = [
      /(\d+\+?\s*years?\s*(?:of\s*)?experience)/gi,
      /(bachelor'?s|master'?s|phd|degree)/gi,
      /(python|java|javascript|react|node\.?js|aws|docker|kubernetes)/gi,
    ];
    
    patterns.forEach(pattern => {
      const matches = description.match(pattern);
      if (matches) {
        matches.slice(0, 3).forEach(match => {
          if (!requirements.includes(match)) {
            requirements.push(match);
          }
        });
      }
    });
    
    return requirements.slice(0, 5);
  }

  /**
   * Helper: Extract benefits
   */
  private extractBenefits(benefits: string[]): string[] {
    return benefits.slice(0, 5);
  }

  /**
   * Generate fallback jobs when API is unavailable
   */
  private generateFallbackJobs(params: JobSearchParams): RealJobData[] {
    console.log('⚠️ Using fallback job data');
    
    const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix'];
    const titles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer'];
    
    return Array.from({ length: 10 }, (_, i) => ({
      id: `fallback_${Date.now()}_${i}`,
      title: `${titles[i % titles.length]} - ${params.query}`,
      company: companies[i % companies.length],
      location: params.location || 'Remote',
      description: `Exciting opportunity to work on ${params.query} projects at a leading tech company.`,
      salary: '$100k - $150k',
      jobType: ['Full-time'],
      postedDate: `${i + 1} days ago`,
      applyUrl: '#',
      source: 'linkedin',
      requirements: ['3+ years experience', 'Bachelor\'s degree'],
      benefits: ['Health Insurance', 'Stock Options', 'Remote Work']
    }));
  }

  /**
   * Check if real data mode is enabled
   */
  isRealDataEnabled(): boolean {
    return this.useRealData && !!this.rapidApiKey;
  }

  /**
   * Get API status
   */
  getApiStatus(): { enabled: boolean; hasKey: boolean; message: string } {
    const hasKey = !!this.rapidApiKey;
    const enabled = this.useRealData;
    
    let message = '';
    if (!hasKey) {
      message = 'RapidAPI key not configured. Add VITE_RAPIDAPI_KEY to .env file.';
    } else if (!enabled) {
      message = 'Real data mode disabled. Set VITE_USE_REAL_DATA=true in .env file.';
    } else {
      message = 'Real data mode enabled. Fetching jobs from LinkedIn, Indeed, and Glassdoor.';
    }
    
    return { enabled, hasKey, message };
  }
}

// Export singleton instance
export const jobBoardsApi = new JobBoardsApiService();
export default jobBoardsApi;
