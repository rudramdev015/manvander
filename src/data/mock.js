// Mock data for LuxiePhoto - Wedding Photography Website
// Organized and optimized for performance

export const navigationLinks = [
  { 
    name: 'Home', 
    path: '#hero', 
    hasDropdown: false 
  },
  { 
    name: 'About', 
    path: '#about', 
    hasDropdown: false 
  },
  {
    name: 'Portfolio',
    path: '#portfolio',
    hasDropdown: false
  },
  {
    name: 'Gallery',
    path: '#gallery',
    hasDropdown: false
  },
  {
    name: 'Testimonials',
    path: '#testimonials', 
    hasDropdown: false 
  },
  { 
    name: 'Contact', 
    path: '#contact', 
    hasDropdown: false 
  }
];

export const heroContent = {
  subtitle: 'Luxury Wedding Photography',
  title: 'Capturing Your',
  titleHighlight: 'Timeless Moments',
  description: 'We transform your precious wedding moments into timeless art. Every frame tells your unique love story.',
  cta: 'View Our Work',
  ctaSecondary: 'Get in Touch',
  stats: [
    { number: '500+', label: 'Weddings Captured' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Awards Won' }
  ]
};

export const aboutContent = {
  subtitle: 'About Us',
  decorativeText: 'Our Story',
  title: "We're Luxie, Passionate Wedding Storytellers",
  description: "With over 15 years of experience, we've had the privilege of capturing hundreds of beautiful love stories. Our approach combines artistic vision with genuine emotion, ensuring every photograph reflects the authentic beauty of your special day.",
  features: [
    {
      title: 'Artistic Vision',
      description: 'Every shot is crafted with an artistic eye for detail and composition.'
    },
    {
      title: 'Authentic Moments',
      description: 'We capture genuine emotions and spontaneous moments that tell your story.'
    },
    {
      title: 'Premium Quality',
      description: 'State-of-the-art equipment and meticulous post-processing for stunning results.'
    }
  ],
  signature: 'Luxie Photo',
  experience: '15+ Years of Excellence'
};

export const services = [
  {
    id: 1,
    icon: 'Camera',
    title: 'Wedding Photography',
    description: 'Full-day coverage capturing every precious moment from preparation to reception.',
    features: ['8+ Hours Coverage', 'Multiple Photographers', '500+ Edited Photos', 'Online Gallery']
  },
  {
    id: 2,
    icon: 'Video',
    title: 'Wedding Videography',
    description: 'Cinematic films that bring your wedding day back to life.',
    features: ['4K Quality', 'Drone Footage', 'Same-Day Edit', 'Highlight Reel']
  },
  {
    id: 3,
    icon: 'Brush',
    title: 'Photo Retouching',
    description: 'Professional editing to perfect every image while maintaining natural beauty.',
    features: ['Color Correction', 'Skin Retouching', 'Background Enhancement', 'Album Design']
  },
  {
    id: 4,
    icon: 'Heart',
    title: 'Pre-Wedding Shoot',
    description: 'Romantic sessions to capture your journey before the big day.',
    features: ['Location Scouting', 'Styling Consultation', '100+ Photos', 'Multiple Outfits']
  }
];

export const portfolioItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    names: 'Arthur & Linda',
    category: 'Classic Wedding',
    location: 'Bali, Indonesia',
    description: 'An intimate garden ceremony filled with timeless elegance and heartfelt moments.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    names: 'Thomas & Grace',
    category: 'Beach Wedding',
    location: 'Maldives',
    description: 'A breathtaking sunset beach ceremony with golden hour perfection.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    names: 'Michael & Gina',
    category: 'Rustic Wedding',
    location: 'Tuscany, Italy',
    description: 'Rustic vineyard romance with rolling hills as the backdrop.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    names: 'Freddie & Aida',
    category: 'Garden Wedding',
    location: 'Singapore',
    description: 'A lush botanical garden celebration surrounded by natural beauty.'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80',
    names: 'Robbie & Maggie',
    category: 'Luxury Wedding',
    location: 'Paris, France',
    description: 'Parisian elegance at its finest with the Eiffel Tower as witness.'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    names: 'Alfie & Jessie',
    category: 'Mountain Wedding',
    location: 'Swiss Alps',
    description: 'A dramatic alpine ceremony with snow-capped peaks all around.'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    names: 'John & Esme',
    category: 'Traditional Wedding',
    location: 'Kyoto, Japan',
    description: 'A beautiful blend of modern love and traditional Japanese aesthetics.'
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
    names: 'Finn & May',
    category: 'Castle Wedding',
    location: 'Scotland',
    description: 'A fairytale celebration in a historic Scottish castle.'
  }
];

export const testimonials = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    names: 'Robbie & Maggie',
    role: 'Bride & Groom',
    rating: 5,
    text: "Wow, we are both blown away! These photos are absolutely beautiful. Thank you so much for capturing our wedding day. You've captured every precious moment in stunning detail. We can't thank you enough.",
    location: 'Paris Wedding'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    names: 'Arthur & Linda',
    role: 'Bride & Groom',
    rating: 5,
    text: "I can't begin to express how truly grateful we are for LuxiePhoto and their incredible talent. From the very first moment, we knew we were in great hands. The entire experience was exceptional.",
    location: 'Bali Wedding'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    names: 'Freddie & Aida',
    role: 'Bride & Groom',
    rating: 5,
    text: "LuxiePhoto beautifully captured every emotion on our wedding day, from happy tears to laughter. Looking through our photos is like reliving the day over and over. Their style is both elegant and candid.",
    location: 'Singapore Wedding'
  }
];

export const partners = [
  { id: 1, name: 'Roxana', logo: null },
  { id: 2, name: 'Felton', logo: null },
  { id: 3, name: 'Pennelope', logo: null },
  { id: 4, name: 'Savannah', logo: null },
  { id: 5, name: 'Sacramento', logo: null },
  { id: 6, name: 'Evelyn', logo: null },
  { id: 7, name: 'Laura Violy', logo: null },
  { id: 8, name: 'Milla', logo: null }
];

export const pricingPlans = [
  {
    id: 1,
    name: 'Essential',
    subtitle: 'Perfect for intimate ceremonies',
    price: 1299,
    currency: '$',
    period: 'per event',
    features: [
      '4 Hours Coverage',
      '1 Professional Photographer',
      '200+ Edited Photos',
      'Online Gallery',
      'Print Release',
      'Engagement Session'
    ],
    notIncluded: ['Second Photographer', 'Videography', 'Album'],
    popular: false,
    cta: 'Choose Essential'
  },
  {
    id: 2,
    name: 'Premium',
    subtitle: 'Our most popular package',
    price: 2499,
    currency: '$',
    period: 'per event',
    features: [
      '8 Hours Coverage',
      '2 Professional Photographers',
      '500+ Edited Photos',
      'Online Gallery',
      'Print Release',
      'Engagement Session',
      'Second Photographer',
      'Highlight Video'
    ],
    notIncluded: ['Full Wedding Film'],
    popular: true,
    cta: 'Choose Premium'
  },
  {
    id: 3,
    name: 'Luxury',
    subtitle: 'The complete experience',
    price: 4999,
    currency: '$',
    period: 'per event',
    features: [
      'Full Day Coverage',
      '3 Professional Photographers',
      '800+ Edited Photos',
      'Online Gallery',
      'Print Release',
      'Engagement Session',
      'Full Wedding Film',
      'Premium Album',
      'Drone Coverage',
      'Same-Day Edit'
    ],
    notIncluded: [],
    popular: false,
    cta: 'Choose Luxury'
  }
];

export const contactInfo = {
  address: 'Jl. Pantai Batu Bolong 69, Canggu, Bali',
  phone: '+62 815 2253 778',
  email: 'hello@luxiephoto.com',
  website: 'www.luxiephoto.com',
  hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
  social: {
    instagram: '@luxiephoto',
    facebook: 'LuxiePhoto',
    pinterest: 'luxiephoto',
    youtube: 'LuxiePhoto'
  }
};

export const blogPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    title: 'Wedding Portfolio Tips for Photographers',
    date: 'January 15, 2026',
    author: 'Luxie Photo',
    category: 'Photography Tips',
    readTime: '5 min read',
    excerpt: 'Learn the essential tips for building a stunning wedding photography portfolio that attracts your ideal clients...'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80',
    title: "Freddie And Aida's Nature Wedding In Bali",
    date: 'January 10, 2026',
    author: 'Luxie Photo',
    category: 'Real Weddings',
    readTime: '8 min read',
    excerpt: 'Step inside this breathtaking Bali wedding surrounded by lush tropical gardens and ocean views...'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
    title: '5 Reasons To Have A Small Wedding In 2026',
    date: 'January 5, 2026',
    author: 'Luxie Photo',
    category: 'Wedding Tips',
    readTime: '4 min read',
    excerpt: 'Discover why intimate weddings are becoming the preferred choice for modern couples seeking meaningful celebrations...'
  }
];

// Footer Gallery (DISABLED - NOT NEEDED)
// export const footerGallery = [
//   'https://images.unsplash.com/photo-1519741497674-611481863552?w=150&h=150&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=150&h=150&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=150&h=150&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=150&h=150&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=150&h=150&fit=crop&q=80',
//   'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=150&h=150&fit=crop&q=80'
// ];

export const socialLinks = [
  { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/luxiephoto' },
  { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/luxiephoto' },
  { name: 'Pinterest', icon: 'PinIcon', url: 'https://pinterest.com/luxiephoto' },
  { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/luxiephoto' }
];

export const faqItems = [
  {
    id: 1,
    question: 'How far in advance should we book?',
    answer: 'We recommend booking at least 6-12 months in advance to ensure availability, especially for peak wedding season dates.'
  },
  {
    id: 2,
    question: 'Do you travel for destination weddings?',
    answer: 'Absolutely! We love destination weddings. Travel fees vary depending on the location. Contact us for a custom quote.'
  },
  {
    id: 3,
    question: 'How long until we receive our photos?',
    answer: 'You\'ll receive your full gallery within 4-6 weeks. Sneak peeks are shared within 48-72 hours of your wedding.'
  },
  {
    id: 4,
    question: 'Can we customize our package?',
    answer: 'Yes! We offer flexible packages that can be tailored to your specific needs and budget. Let\'s create your perfect package together.'
  }
];
