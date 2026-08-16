/**
 * Declarative field schemas that drive the generic dashboard forms - one
 * definition per section/collection instead of a bespoke form component
 * for each. Field `type` maps to a renderer in components/fields.js.
 *
 * Field types: text, textarea, number, boolean, image, video,
 * list-strings (simple tag list), nested-list-strings (rows of tag lists,
 * e.g. services' tagGroups), list-images, list-objects (repeatable group
 * of sub-fields, e.g. About's features or Journey's stats).
 */

export const SECTION_SCHEMAS = {
  settings: {
    label: 'Site Settings',
    fields: [
      { name: 'siteName', label: 'Site Name', type: 'text' },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'logoLight', label: 'Logo (transparent header)', type: 'image' },
      { name: 'logoDark', label: 'Logo (white header)', type: 'image' },
      { name: 'logoLightHeight', label: 'Logo Height - Transparent (px)', type: 'number' },
      { name: 'logoDarkHeight', label: 'Logo Height - White (px)', type: 'number' },
      { name: 'logoFooter', label: 'Logo (footer)', type: 'image' },
      { name: 'favicon', label: 'Favicon', type: 'image' },
      { name: 'colors.primary', label: 'Primary Brand Color', type: 'color' },
    ],
  },
  social: {
    label: 'Social Media',
    fields: [
      { name: 'instagram', label: 'Instagram URL', type: 'text' },
      { name: 'facebook', label: 'Facebook URL', type: 'text' },
      { name: 'youtube', label: 'YouTube URL', type: 'text' },
      { name: 'tiktok', label: 'TikTok URL', type: 'text' },
      { name: 'twitter', label: 'Twitter/X URL', type: 'text' },
      { name: 'pinterest', label: 'Pinterest URL', type: 'text' },
      { name: 'whatsapp', label: 'WhatsApp Number', type: 'text' },
    ],
  },
  hero: {
    label: 'Hero Section',
    fields: [
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'ctaText', label: 'Primary Button Text', type: 'text' },
      { name: 'ctaSecondaryText', label: 'Secondary Button Text', type: 'text' },
      { name: 'videoPoster', label: 'Video Poster Image', type: 'image' },
      { name: 'backgroundVideo.mp4', label: 'Background Video (MP4)', type: 'video' },
      { name: 'backgroundVideo.webm', label: 'Background Video (WebM, optional)', type: 'video' },
      { name: 'backgroundImages', label: 'Background Images (used if no video)', type: 'list-images' },
    ],
  },
  intro: {
    label: 'Intro Statement',
    fields: [{ name: 'text', label: 'Paragraph Text', type: 'textarea' }],
  },
  about: {
    label: 'About Section',
    fields: [
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'decorativeText', label: 'Decorative Text', type: 'text' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'badge.number', label: 'Badge Number', type: 'text' },
      { name: 'badge.label', label: 'Badge Label', type: 'text' },
      { name: 'signature', label: 'Signature Name', type: 'text' },
      { name: 'signatureRole', label: 'Signature Role', type: 'text' },
      { name: 'cta.text', label: 'CTA Button Text', type: 'text' },
      { name: 'cta.link', label: 'CTA Button Link', type: 'text' },
      {
        name: 'features', label: 'Feature Pillars', type: 'list-objects',
        subFields: [
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
      },
    ],
  },
  journey: {
    label: 'Journey / Stats',
    fields: [
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'decorativeText', label: 'Decorative Text', type: 'text' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'supportingLine', label: 'Supporting Line', type: 'textarea' },
      {
        name: 'stats', label: 'Stats', type: 'list-objects',
        subFields: [
          { name: 'number', label: 'Number', type: 'text' },
          { name: 'label', label: 'Label', type: 'text' },
        ],
      },
    ],
  },
  whyChooseUs: {
    label: 'Why Choose Us',
    fields: [
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'decorativeText', label: 'Decorative Text', type: 'text' },
      { name: 'title', label: 'Title', type: 'text' },
      {
        name: 'items', label: 'Reasons', type: 'list-objects',
        subFields: [
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
      },
    ],
  },
  contact: {
    label: 'Contact Section',
    fields: [
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'decorativeText', label: 'Decorative Text', type: 'text' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'formTitle', label: 'Form Title', type: 'text' },
      { name: 'formDescription', label: 'Form Description', type: 'text' },
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'hours', label: 'Business Hours', type: 'text' },
    ],
  },
  trustedBy: {
    label: 'Trusted By - Section Title',
    fields: [{ name: 'title', label: 'Section Title', type: 'text' }],
  },
};

export const ITEM_SCHEMAS = {
  services: {
    label: 'Services',
    summary: (d) => d.title || 'Untitled service',
    fields: [
      { name: 'title', label: 'Service Title', type: 'text' },
      { name: 'intro', label: 'Intro Line', type: 'textarea' },
      { name: 'tagGroups', label: 'Tag Groups', type: 'nested-list-strings' },
      { name: 'closing', label: 'Closing Statement', type: 'textarea' },
    ],
  },
  portfolio: {
    label: 'Portfolio Stories',
    summary: (d) => d.names || 'Untitled story',
    fields: [
      { name: 'names', label: 'Couple Names / Title', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'description', label: 'Card Caption (short)', type: 'textarea' },
      { name: 'story', label: 'Full Story (shown on the story page)', type: 'textarea' },
      { name: 'image', label: 'Cover Image', type: 'image' },
      { name: 'gallery', label: 'Gallery Images', type: 'list-images' },
      { name: 'featured', label: 'Featured on Homepage', type: 'boolean' },
    ],
  },
  testimonials: {
    label: 'Testimonials',
    summary: (d) => d.names || 'Untitled testimonial',
    fields: [
      { name: 'names', label: 'Couple Names', type: 'text' },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'rating', label: 'Rating (1-5)', type: 'number' },
      { name: 'text', label: 'Testimonial Text', type: 'textarea' },
      { name: 'location', label: 'Location/Event', type: 'text' },
      { name: 'avatar', label: 'Avatar Image', type: 'image' },
      { name: 'image', label: 'Wedding Image', type: 'image' },
    ],
  },
  partners: {
    label: 'Partners',
    summary: (d) => d.name || 'Untitled partner',
    fields: [
      { name: 'name', label: 'Partner Name', type: 'text' },
      { name: 'logo', label: 'Logo', type: 'image' },
      { name: 'website', label: 'Website', type: 'text' },
    ],
  },
  gallery: {
    label: 'Gallery',
    summary: (d) => d.title || 'Untitled item',
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'mediaType', label: 'Media Type', type: 'select', options: ['Photo', 'Video'] },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'image', label: 'Thumbnail Image', type: 'image' },
      { name: 'videoUrl', label: 'Video URL (YouTube/Vimeo, if Video)', type: 'text' },
      { name: 'featured', label: 'Featured', type: 'boolean' },
    ],
  },
  faq: {
    label: 'FAQ',
    summary: (d) => d.question || 'Untitled question',
    fields: [
      { name: 'question', label: 'Question', type: 'text' },
      { name: 'answer', label: 'Answer', type: 'textarea' },
    ],
  },
  trustedBy: {
    label: 'Trusted By - Couples',
    summary: (d) => d.names || 'Untitled couple',
    fields: [
      { name: 'names', label: 'Names', type: 'text' },
      { name: 'image', label: 'Photo', type: 'image' },
    ],
  },
};
