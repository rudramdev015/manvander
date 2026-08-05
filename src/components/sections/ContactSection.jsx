import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle, Button, OptimizedImage, AnimatedSection, StaggerContainer, StaggerItem } from '@/components/common';
import { isValidEmail } from '@/utils/helpers';

const ContactSection = () => {
  const { getContact, getSocialMedia } = useCMS();
  const contactInfo = getContact();
  const social = getSocialMedia();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (status.type === 'error') {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name.' });
      return;
    }
    if (!isValidEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '370cfe1e-f1d9-4c5a-8b00-143492231f31',
          subject: `New Enquiry from ${formData.name}`,
          from_name: 'House of Echoes Website',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message || 'No message',
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ type: 'success', message: 'Thank you! We\'ll get back to you shortly with a tailored plan.' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again or contact us directly.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      label: 'Visit Us',
      value: contactInfo?.address || 'Pan-India service area',
      link: `https://maps.google.com/?q=${encodeURIComponent(contactInfo?.address || 'India')}`,
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: contactInfo?.phone || '+91-98765-43210',
      link: `tel:${(contactInfo?.phone || '').replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email Us',
      value: contactInfo?.email || 'hello@houseofechoes.com',
      link: `mailto:${contactInfo?.email || 'hello@houseofechoes.com'}`,
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: contactInfo?.hours || 'Available for bookings across India',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50/50" />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Content */}
          <AnimatedSection animation="fadeInLeft">
            <SectionTitle
              subtitle={contactInfo?.subtitle || "Get In Touch"}
              decorativeText={contactInfo?.decorativeText || "Contact"}
              title={contactInfo?.title || "Let's Write Your Story"}
              align="left"
              animated={false}
            />

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              {contactInfo?.description || "Have a wedding, celebration, or event coming up? Let's talk about how House of Echoes can capture it."}
            </p>

            {/* Contact Details */}
            <StaggerContainer className="space-y-6" staggerDelay={0.1}>
              {contactDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <StaggerItem key={index}>
                    <motion.a
                      href={detail.link}
                      target={detail.link?.startsWith('http') ? '_blank' : undefined}
                      rel={detail.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white shadow-soft flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:shadow-primary-500/30 transition-all duration-300">
                        <Icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block mb-1">{detail.label}</span>
                        <span className="text-gray-900 font-medium group-hover:text-primary-500 transition-colors">
                          {detail.value}
                        </span>
                      </div>
                    </motion.a>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </AnimatedSection>

          {/* Right Content - Form */}
          <AnimatedSection animation="fadeInRight">
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
              <h3 className="font-serif text-2xl text-gray-900 mb-2">{contactInfo?.formTitle || "Enquire Now"}</h3>
              <p className="text-gray-500 mb-8">{contactInfo?.formDescription || "Share your dates, event type, and location — we'll get back with a tailored plan."}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    placeholder="+62 xxx xxxx xxxx"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your vision..."
                  />
                </div>

                {/* Status Message */}
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-4 rounded-xl ${
                      status.type === 'success' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <span>{status.message}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={Send}
                  iconPosition="right"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting this form, you agree to our{' '}
                  <a href="/privacy" className="text-primary-500 hover:underline">Privacy Policy</a>
                </p>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
