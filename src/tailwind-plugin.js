const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  function ({ addComponents, addBase }) {
    addBase({
      html: {
        fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
      },
    });
    typo.forEach((style) => {
      style.sizes.forEach((size) => {
        const [name, fontSize, fontWeight, lineHeight, letterSpacing] = size;
        addComponents({
          [`.fm-typo-${style.type}-${name}-${fontWeight}`]: {
            fontSize,
            fontWeight,
            lineHeight,
            letterSpacing,
            textDecorationLine: style.type === 'link' ? 'underline' : 'none',
          },
        });
      });
    });
    // tailwind doesn't have text shadow
    addComponents({
      '.fm-shadow-light-text': {
        'text-shadow': '0px 1px 2px rgba(28, 28, 30, 0.24)',
      },
    });
  },
  {
    theme: {
      extend: {
        colors: {
          'fm-color-primary': '#FF7823',
          'fm-color-oatmeal': '#FBE5CB',
          'fm-color-secondary-macaron': '#8CE6D7',
          'fm-color-secondary-blue-pea': '#2B388F',
          'fm-color-secondary-salmon': '#FF5D53',
          'fm-color-secondary-tuna': '#73C8E6',
          'fm-color-secondary-citrus': '#FCA23E',
          'fm-color-secondary-pink-salt': '#F09BBE',
          'fm-color-secondary-mustard': '#FFD232',
          'fm-color-secondary-mint': '#50BE9B',
          'fm-color-neutral-white': '#FFFFFF',
          'fm-color-neutral-black': '#1C1C1E',
          'fm-color-neutral-gray': {
            100: '#F2F2F7',
            200: '#C7C7CC',
            300: '#AEAEB2',
            400: '#6B6B6B',
          },
          'fm-color-typo': {
            white: '#FFFFFF',
            disabled: '#C7C7CC',
            tertiary: '#AEAEB2',
            secondary: '#6B6B6B',
            primary: '#1C1C1E',
            success: '#1F7735',
            warning: '#995900',
            error: '#99231D',
            info: '#004999',
          },
          'fm-color-system-success': {
            100: '#EBF9EE',
            200: '#85DD9B',
            300: '#34C759',
            400: '#1F7735',
          },
          'fm-color-system-warning': {
            100: '#FFF4E6',
            200: '#FFBF66',
            300: '#FF9500',
            400: '#995900',
          },
          'fm-color-system-error': {
            100: '#FFEBEA',
            200: '#FF8983',
            300: '#FF3B30',
            400: '#99231D',
          },
          'fm-color-system-info': {
            100: '#E6F2FF',
            200: '#66AFFF',
            300: '#007AFF',
            400: '#004999',
          },
          'fm-color-overlay-background': 'rgba(102, 102, 102, 0.76)',
          'fm-color-opacity': {
            sm: 'rgba(28, 28, 30, 0.08)',
            md: 'rgba(28, 28, 30, 0.16)',
            lg: 'rgba(28, 28, 30, 0.24)',
          },
        },
      },
      boxShadow: {
        'light-100': '0px 1px 4px 0px rgba(28, 28, 30, 0.24)',
        'light-200': '0px 4px 8px 0px rgba(199, 199, 204, 0.24)',
        'light-300': '0px 8px 16px 0px rgba(199, 199, 204, 0.24)',
        'light-400': '0px 16px 24px 0px rgba(199, 199, 204, 0.24)',
        'light-500': '0px 24px 32px -4px rgba(199, 199, 204, 0.24)',
        'light-600': '0px 32px 40px -4px rgba(199, 199, 204, 0.24)',
      },
    },
  },
);

const typo = [
  {
    type: 'display',
    sizes: [
      ['xl', '4.5rem', 700, '1.1389', '0.025em'],
      ['lg', '3.75rem', 700, '1.1333', '0.025em'],
      ['md', '3rem', 700, '1.125', '0.025em'],
      ['sm', '2.25rem', 700, '1.1111', '0.025em'],
    ],
  },
  {
    type: 'title',
    sizes: [
      ['lg', '1.875rem', 700, '1.1333', '0.025em'],
      ['md', '1.625rem', 700, '1.2308', '0.015em'],
      ['sm', '1.375rem', 700, '1.2727', '0.015em'],
    ],
  },
  {
    type: 'body',
    sizes: [
      ['xl', '1.125rem', 700, '1.3333', '0.01em'],
      ['lg', '1rem', 700, '1.5', '0.005em'],
      ['md', '0.875rem', 700, '1.5714', '0.0125em'],
      ['sm', '0.75rem', 700, '1.6667', '0.02em'],
      ['lg', '1rem', 400, '1.5', '-0.005em'],
      ['md', '0.875rem', 400, '1.5714', '0.01em'],
      ['sm', '0.75rem', 400, '1.6667', '0.02em'],
    ],
  },
  {
    type: 'link',
    sizes: [
      ['lg', '1rem', 700, '1.5', '0.01em'],
      ['md', '0.875rem', 700, '1.5714', '0.0125em'],
      ['sm', '0.75rem', 700, '1.6667', '0.015em'],
    ],
  },
];
