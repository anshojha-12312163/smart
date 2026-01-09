import { motion } from 'motion/react';
import { Check, Zap, Crown, Building2, Star } from 'lucide-react';

export function Pricing({ user }: { user: any }) {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: Zap,
      color: 'from-gray-500 to-gray-600',
      popular: false,
      features: [
        'Basic CV analysis',
        '5 job applications per month',
        'Standard job search',
        'Basic profile',
        'Email support',
        { text: 'AI-powered matching', available: false },
        { text: 'Priority support', available: false },
        { text: 'Advanced analytics', available: false }
      ]
    },
    {
      name: 'Premium',
      price: '$1',
      period: 'per month',
      description: 'Best value for serious job seekers',
      icon: Crown,
      color: 'from-cyan-500 to-purple-500',
      popular: true,
      features: [
        'Advanced AI CV analysis',
        'Unlimited job applications',
        'AI-powered job matching',
        'Premium CV templates',
        'Priority email support',
        'Interview preparation tools',
        'Application tracking',
        'Career insights & analytics',
        'No advertisements',
        'Early access to new features'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For teams and organizations',
      icon: Building2,
      color: 'from-purple-500 to-pink-500',
      popular: false,
      features: [
        'Everything in Premium',
        'Custom integrations',
        'Dedicated account manager',
        'Team collaboration tools',
        'Advanced reporting',
        'Custom branding',
        'API access',
        'SLA guarantee',
        '24/7 phone support',
        'On-premise deployment option'
      ]
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full text-cyan-400 mb-4"
          >
            <Star className="w-4 h-4" />
            <span className="text-sm font-semibold">Special Launch Pricing</span>
          </motion.div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Unlock the full potential of AI-powered job search and land your dream job faster
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: plan.popular ? -8 : -4, scale: plan.popular ? 1.02 : 1.01 }}
                className={`relative ${plan.popular ? 'md:-mt-4' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`h-full bg-white/5 backdrop-blur-xl rounded-2xl p-8 border transition-all ${
                  plan.popular
                    ? 'border-cyan-400/50 shadow-2xl shadow-cyan-500/20'
                    : 'border-white/10'
                }`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Details */}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      {plan.period !== 'contact us' && (
                        <span className="text-gray-400">/{plan.period}</span>
                      )}
                    </div>
                    {plan.period === 'contact us' && (
                      <p className="text-sm text-gray-400">Custom pricing for your needs</p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-semibold mb-8 transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30'
                        : 'bg-white/10 text-white hover:bg-white/15'
                    }`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </motion.button>

                  {/* Features */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-400 mb-4">What's included:</p>
                    {plan.features.map((feature, featureIndex) => {
                      const isObject = typeof feature === 'object';
                      const text = isObject ? feature.text : feature;
                      const available = isObject ? feature.available : true;

                      return (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                          className={`flex items-start gap-3 ${!available ? 'opacity-40' : ''}`}
                        >
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            available
                              ? plan.popular
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
                                : 'bg-white/10'
                              : 'bg-white/5'
                          }`}>
                            <Check className={`w-3 h-3 ${available ? 'text-white' : 'text-gray-600'}`} />
                          </div>
                          <span className={`text-sm ${available ? 'text-gray-300' : 'text-gray-600'}`}>
                            {text}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Glow Effect */}
                {plan.popular && (
                  <div className={`absolute -inset-1 bg-gradient-to-r ${plan.color} rounded-2xl opacity-20 blur-2xl -z-10`} />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I upgrade or downgrade my plan anytime?',
                a: 'Yes! You can change your plan at any time. Upgrades are instant, and downgrades take effect at the end of your billing cycle.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and cryptocurrency payments for your convenience.'
              },
              {
                q: 'Is there a refund policy?',
                a: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your payment, no questions asked.'
              },
              {
                q: 'Do you offer discounts for annual subscriptions?',
                a: 'Yes! Annual subscriptions receive a 20% discount compared to monthly billing.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to supercharge your job search?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs using SmartHire AI
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
          >
            Start Free Trial
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
