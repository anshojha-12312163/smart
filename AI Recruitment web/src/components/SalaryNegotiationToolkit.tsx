import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  TrendingUp, 
  Calculator, 
  FileText, 
  Target, 
  Award, 
  BarChart3, 
  MapPin,
  Users,
  Briefcase,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Download,
  Copy,
  Send,
  Eye,
  Plus,
  Minus
} from 'lucide-react';

interface SalaryNegotiationToolkitProps {
  user: any;
}

interface SalaryData {
  role: string;
  location: string;
  experience: string;
  company: string;
  baseSalary: number;
  totalComp: number;
  percentile: number;
}

interface NegotiationScript {
  id: string;
  title: string;
  scenario: string;
  script: string;
  tips: string[];
}

interface MarketData {
  role: string;
  location: string;
  min: number;
  median: number;
  max: number;
  samples: number;
}

export function SalaryNegotiationToolkit({ user }: SalaryNegotiationToolkitProps) {
  const [selectedTool, setSelectedTool] = useState('calculator');
  const [calculatorData, setCalculatorData] = useState({
    role: 'Software Engineer',
    location: 'San Francisco, CA',
    experience: '3-5 years',
    currentSalary: 120000,
    targetSalary: 150000,
    skills: [] as string[],
    education: 'Bachelor\'s',
    companySize: 'Large'
  });
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [selectedScript, setSelectedScript] = useState<NegotiationScript | null>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [showAddOffer, setShowAddOffer] = useState(false);

  const tools = [
    { id: 'calculator', label: 'Salary Calculator', icon: Calculator },
    { id: 'negotiation', label: 'Negotiation Scripts', icon: FileText },
    { id: 'market', label: 'Market Data', icon: BarChart3 },
    { id: 'offers', label: 'Offer Comparison', icon: Target }
  ];

  const negotiationScripts: NegotiationScript[] = [
    {
      id: '1',
      title: 'Initial Salary Negotiation',
      scenario: 'You received an offer but want to negotiate the base salary',
      script: `Thank you for the offer. I'm very excited about the opportunity to join [Company] and contribute to [specific project/team]. 

After researching market rates for similar positions in [location], I've found that the typical range is [X-Y]. Given my [specific experience/skills], I was hoping we could discuss adjusting the base salary to [target amount].

I'm confident that my experience with [relevant skills] and track record of [specific achievements] will bring significant value to the team. Would there be flexibility in the compensation package?`,
      tips: [
        'Research market rates thoroughly before negotiating',
        'Highlight specific value you bring to the role',
        'Be prepared to justify your ask with concrete examples',
        'Consider the entire compensation package, not just base salary'
      ]
    },
    {
      id: '2',
      title: 'Counter Offer Response',
      scenario: 'Your current employer made a counter offer to retain you',
      script: `I appreciate [Current Company] valuing my contributions and making this counter offer. The increased compensation and [other benefits] are certainly attractive.

However, my decision to explore new opportunities was driven by [career growth/new challenges/specific reasons]. While the financial aspect is important, I'm also looking for [specific opportunities that new role offers].

I'd like to take [timeframe] to carefully consider both opportunities and make the best decision for my career. Can we schedule a follow-up conversation by [specific date]?`,
      tips: [
        'Don\'t make decisions under pressure',
        'Consider long-term career impact, not just immediate compensation',
        'Be honest about your motivations for leaving',
        'Maintain professionalism with both employers'
      ]
    },
    {
      id: '3',
      title: 'Promotion Salary Discussion',
      scenario: 'Discussing compensation for an internal promotion',
      script: `I'm thrilled about the opportunity to take on the [new role] position. Based on my research and the additional responsibilities this role entails, I'd like to discuss the compensation adjustment.

In my current role, I've [specific achievements]. The new position will involve [additional responsibilities], and I've seen similar roles in the market ranging from [salary range].

Given my proven track record and the value I'll bring to this expanded role, I believe a salary of [target amount] would be appropriate. I'm also interested in discussing [other benefits/growth opportunities].`,
      tips: [
        'Document your achievements and added responsibilities',
        'Research internal pay equity and external market rates',
        'Emphasize your proven track record within the company',
        'Consider asking for a performance review timeline'
      ]
    },
    {
      id: '4',
      title: 'Benefits Negotiation',
      scenario: 'Negotiating non-salary benefits when salary is fixed',
      script: `I understand the salary range for this position is fixed at [amount]. I'm still very interested in the role and would like to explore other aspects of the compensation package.

Would there be flexibility in areas such as:
- Additional vacation days or flexible PTO
- Professional development budget or conference attendance
- Flexible work arrangements or remote work options
- Earlier performance review for salary adjustment
- Stock options or equity participation
- Signing bonus to offset the salary difference

I believe these adjustments would help bridge the gap while staying within your salary constraints.`,
      tips: [
        'Be creative with non-monetary benefits',
        'Consider long-term value of benefits like equity or training',
        'Propose specific alternatives rather than vague requests',
        'Show flexibility and willingness to find win-win solutions'
      ]
    }
  ];

  const marketData: MarketData[] = [
    { role: 'Software Engineer', location: 'San Francisco, CA', min: 130000, median: 165000, max: 220000, samples: 1250 },
    { role: 'Software Engineer', location: 'New York, NY', min: 120000, median: 155000, max: 200000, samples: 980 },
    { role: 'Software Engineer', location: 'Seattle, WA', min: 115000, median: 145000, max: 185000, samples: 750 },
    { role: 'Product Manager', location: 'San Francisco, CA', min: 140000, median: 175000, max: 250000, samples: 650 },
    { role: 'Data Scientist', location: 'San Francisco, CA', min: 125000, median: 160000, max: 210000, samples: 450 },
    { role: 'DevOps Engineer', location: 'San Francisco, CA', min: 120000, median: 150000, max: 190000, samples: 380 }
  ];

  const calculateSalary = () => {
    // Mock calculation based on various factors
    const baseMarket = marketData.find(d => 
      d.role === calculatorData.role && d.location === calculatorData.location
    ) || marketData[0];

    const experienceMultiplier = {
      '0-2 years': 0.85,
      '3-5 years': 1.0,
      '6-10 years': 1.25,
      '10+ years': 1.5
    }[calculatorData.experience] || 1.0;

    const educationBonus = {
      'High School': 0,
      'Bachelor\'s': 5000,
      'Master\'s': 15000,
      'PhD': 25000
    }[calculatorData.education] || 0;

    const companySizeMultiplier = {
      'Startup': 0.9,
      'Small': 0.95,
      'Medium': 1.0,
      'Large': 1.1
    }[calculatorData.companySize] || 1.0;

    const skillsBonus = calculatorData.skills.length * 2000;

    const estimatedSalary = Math.round(
      (baseMarket.median * experienceMultiplier * companySizeMultiplier) + 
      educationBonus + skillsBonus
    );

    const percentile = Math.min(95, Math.max(5, 
      ((estimatedSalary - baseMarket.min) / (baseMarket.max - baseMarket.min)) * 100
    ));

    setCalculationResult({
      estimatedSalary,
      marketMin: baseMarket.min,
      marketMax: baseMarket.max,
      marketMedian: baseMarket.median,
      percentile: Math.round(percentile),
      factors: {
        experience: Math.round((experienceMultiplier - 1) * 100),
        education: educationBonus,
        companySize: Math.round((companySizeMultiplier - 1) * 100),
        skills: skillsBonus
      }
    });
  };

  const addSkill = (skill: string) => {
    if (skill && !calculatorData.skills.includes(skill)) {
      setCalculatorData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setCalculatorData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const renderCalculator = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Salary Calculator</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Job Title
              </label>
              <select
                value={calculatorData.role}
                onChange={(e) => setCalculatorData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Software Engineer">Software Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="UX Designer">UX Designer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Location
              </label>
              <select
                value={calculatorData.location}
                onChange={(e) => setCalculatorData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="New York, NY">New York, NY</option>
                <option value="Seattle, WA">Seattle, WA</option>
                <option value="Austin, TX">Austin, TX</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Experience Level
              </label>
              <select
                value={calculatorData.experience}
                onChange={(e) => setCalculatorData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="0-2 years">0-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="6-10 years">6-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Education
              </label>
              <select
                value={calculatorData.education}
                onChange={(e) => setCalculatorData(prev => ({ ...prev, education: e.target.value }))}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's Degree</option>
                <option value="Master's">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Company Size
              </label>
              <select
                value={calculatorData.companySize}
                onChange={(e) => setCalculatorData(prev => ({ ...prev, companySize: e.target.value }))}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Startup">Startup (1-50)</option>
                <option value="Small">Small (51-200)</option>
                <option value="Medium">Medium (201-1000)</option>
                <option value="Large">Large (1000+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {calculatorData.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded text-sm flex items-center gap-1">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="text-blue-500 hover:text-blue-700">
                      <Minus className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {['React', 'Python', 'AWS', 'Docker', 'TypeScript', 'Node.js'].filter(skill => 
                  !calculatorData.skills.includes(skill)
                ).slice(0, 3).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => addSkill(skill)}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateSalary}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Calculate Salary Range
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Salary Estimate</h3>
          
          {calculationResult ? (
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${calculationResult.estimatedSalary.toLocaleString()}
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">Estimated Annual Salary</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {calculationResult.percentile}th percentile
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Market Range</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ${calculationResult.marketMin.toLocaleString()} - ${calculationResult.marketMax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Market Median</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ${calculationResult.marketMedian.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">Salary Factors</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Experience Level</span>
                    <span className={calculationResult.factors.experience >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {calculationResult.factors.experience >= 0 ? '+' : ''}{calculationResult.factors.experience}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Education Bonus</span>
                    <span className="text-green-600">+${calculationResult.factors.education.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Company Size</span>
                    <span className={calculationResult.factors.companySize >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {calculationResult.factors.companySize >= 0 ? '+' : ''}{calculationResult.factors.companySize}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Skills Bonus</span>
                    <span className="text-green-600">+${calculationResult.factors.skills.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => {
                    const report = `💰 Salary Analysis Report\n\n🎯 Role: ${calculatorData.role}\n📍 Location: ${calculatorData.location}\n⏱️ Experience: ${calculatorData.experience}\n\n💵 Estimated Salary: $${calculationResult.estimatedSalary.toLocaleString()}\n📊 Market Percentile: ${calculationResult.percentile}th\n\n📈 Market Data:\n• Min: $${calculationResult.marketMin.toLocaleString()}\n• Median: $${calculationResult.marketMedian.toLocaleString()}\n• Max: $${calculationResult.marketMax.toLocaleString()}\n\n🔧 Salary Factors:\n• Experience: ${calculationResult.factors.experience}%\n• Education: +$${calculationResult.factors.education.toLocaleString()}\n• Company Size: ${calculationResult.factors.companySize}%\n• Skills: +$${calculationResult.factors.skills.toLocaleString()}\n\n💡 Negotiation Range: $${Math.round(calculationResult.estimatedSalary * 0.95).toLocaleString()} - $${Math.round(calculationResult.estimatedSalary * 1.15).toLocaleString()}`;
                    navigator.clipboard.writeText(report);
                    alert('Salary report copied to clipboard!');
                  }}
                  className="flex-1 px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm flex items-center justify-center gap-1"
                >
                  <Copy className="w-4 h-4" />
                  Copy Report
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([`Salary Analysis Report\n\nRole: ${calculatorData.role}\nLocation: ${calculatorData.location}\nExperience: ${calculatorData.experience}\n\nEstimated Salary: $${calculationResult.estimatedSalary.toLocaleString()}\nMarket Percentile: ${calculationResult.percentile}th\n\nMarket Range: $${calculationResult.marketMin.toLocaleString()} - $${calculationResult.marketMax.toLocaleString()}\nMarket Median: $${calculationResult.marketMedian.toLocaleString()}\n\nSalary Factors:\nExperience: ${calculationResult.factors.experience}%\nEducation: +$${calculationResult.factors.education.toLocaleString()}\nCompany Size: ${calculationResult.factors.companySize}%\nSkills: +$${calculationResult.factors.skills.toLocaleString()}`], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'salary-analysis.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Calculator className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-400">
                Fill out the form and click "Calculate" to see your salary estimate
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderNegotiationScripts = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {negotiationScripts.map((script, index) => (
          <motion.div
            key={script.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{script.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{script.scenario}</p>
            
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 mb-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {script.script.substring(0, 150)}...
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedScript(script)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                View Full Script
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(script.script);
                  alert('Script copied to clipboard!');
                }}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderMarketData = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Market Salary Data</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Role</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Location</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Min</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Median</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Max</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Samples</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((data, index) => (
                <tr key={index} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">{data.role}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{data.location}</td>
                  <td className="py-3 px-4 text-slate-900 dark:text-white">${data.min.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">${data.median.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-900 dark:text-white">${data.max.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{data.samples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h4 className="font-bold text-blue-900 dark:text-blue-400">Salary Trends</h4>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Tech salaries have increased 8-12% year-over-year, with remote positions offering competitive compensation.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-8 h-8 text-green-600" />
            <h4 className="font-bold text-green-900 dark:text-green-400">Location Impact</h4>
          </div>
          <p className="text-sm text-green-800 dark:text-green-300">
            San Francisco and New York continue to offer the highest salaries, but cost of living adjustments are important.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-8 h-8 text-purple-600" />
            <h4 className="font-bold text-purple-900 dark:text-purple-400">Skills Premium</h4>
          </div>
          <p className="text-sm text-purple-800 dark:text-purple-300">
            AI/ML, cloud architecture, and security skills command 15-25% salary premiums in current market.
          </p>
        </div>
      </div>
    </div>
  );

  const renderOfferComparison = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Compare Job Offers</h3>
        <button
          onClick={() => setShowAddOffer(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Offer
        </button>
      </div>

      {offers.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 text-center">
          <Target className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="font-medium text-slate-900 dark:text-white mb-2">No offers to compare yet</h4>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Add your job offers to compare compensation packages side by side
          </p>
          <button
            onClick={() => setShowAddOffer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Offer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">{offer.company}</h4>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{offer.role}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Base Salary</span>
                  <span className="font-medium text-slate-900 dark:text-white">${offer.baseSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total Comp</span>
                  <span className="font-medium text-slate-900 dark:text-white">${offer.totalComp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Location</span>
                  <span className="font-medium text-slate-900 dark:text-white">{offer.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Salary Negotiation Toolkit
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Get the compensation you deserve with data-driven negotiation tools
          </p>
        </motion.div>

        {/* Tool Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.button
                key={tool.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTool(tool.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedTool === tool.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tool.label}
              </motion.button>
            );
          })}
        </div>

        {/* Content Area */}
        <motion.div
          key={selectedTool}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {selectedTool === 'calculator' && renderCalculator()}
          {selectedTool === 'negotiation' && renderNegotiationScripts()}
          {selectedTool === 'market' && renderMarketData()}
          {selectedTool === 'offers' && renderOfferComparison()}
        </motion.div>
      </div>

      {/* Script Detail Modal */}
      <AnimatePresence>
        {selectedScript && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedScript(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedScript.title}</h3>
                <button
                  onClick={() => setSelectedScript(null)}
                  className="p-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-4">{selectedScript.scenario}</p>

              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">Script:</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedScript.script}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">Tips:</h4>
                <ul className="space-y-1">
                  {selectedScript.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedScript.script);
                    alert('Script copied to clipboard!');
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Script
                </button>
                <button
                  onClick={() => setSelectedScript(null)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}