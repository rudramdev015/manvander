import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle, Button, StaggerContainer, StaggerItem } from '@/components/common';
import { cn, formatPrice } from '@/utils/helpers';

const PricingSection = () => {
  const { getPricing } = useCMS();
  const pricingPlans = getPricing() || [];
  
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <SectionTitle
          subtitle="Packages"
          decorativeText="Investment"
          title="Choose Your Story"
          description="Flexible packages for weddings, pre-wedding shoots, corporate events, and destination celebrations."
        />

        {/* Pricing Cards */}
        <StaggerContainer
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          staggerDelay={0.15}
        >
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.id}>
              <motion.div
                whileHover={{ y: -8 }}
                className={cn(
                  'relative bg-white rounded-3xl transition-all duration-500 h-full',
                  plan.popular
                    ? 'shadow-2xl shadow-primary-500/20 ring-2 ring-primary-500'
                    : 'shadow-soft hover:shadow-xl border border-gray-100'
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-medium px-6 py-2 rounded-full shadow-lg shadow-primary-500/30 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </motion.div>
                )}

                <div className="p-8">
                  {/* Plan Name */}
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl text-gray-900 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-gray-500 text-2xl">{plan.currency}</span>
                      <span className="font-serif text-6xl text-gray-900 mx-1">
                        {plan.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{plan.period}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" />

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {(plan?.features || []).map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start"
                      >
                        <div className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3',
                          plan.popular ? 'bg-primary-100' : 'bg-gray-100'
                        )}>
                          <Check className={cn(
                            'w-3 h-3',
                            plan.popular ? 'text-primary-500' : 'text-gray-600'
                          )} />
                        </div>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                    
                    {/* Not Included Features */}
                    {plan.notIncluded?.map((feature, index) => (
                      <motion.li
                        key={`not-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (plan.features.length + index) * 0.05 }}
                        className="flex items-start opacity-50"
                      >
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                          <X className="w-3 h-3 text-gray-400" />
                        </div>
                        <span className="text-gray-400 text-sm line-through">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={plan.ctaLink || '#contact'}
                    target={plan.ctaLink?.startsWith('http') ? '_blank' : undefined}
                    rel={plan.ctaLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block"
                  >
                    <Button
                      variant={plan.popular ? 'primary' : 'outline'}
                      size="lg"
                      className="w-full"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      {plan.ctaText || 'Choose Plan'}
                    </Button>
                  </a>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-4">
            Need a custom package? We are happy to build something tailored to your dates, venue, and event scale.
          </p>
          <Button
            variant="link"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => window.location.href = '/contact'}
          >
            Enquire for a custom quote
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
        >
          {[
            { label: 'Secure Payment', icon: '🔒' },
            { label: 'Money-back Guarantee', icon: '💰' },
            { label: '24/7 Support', icon: '💬' },
            { label: 'No Hidden Fees', icon: '✨' },
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="text-lg">{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
