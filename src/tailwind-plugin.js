const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  function ({ addComponents, addBase }) {
    addBase({
      html: {
        fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
      },
    });
    ['display', 'title', 'body', 'body-link'].forEach((type) => {
      addComponents({
        [`.fm-typo-${type}-xl-700`]: {
          fontSize: '4.5rem',
          lineHeight: 1.1389,
          letterSpacing: '0.025em',
          fontWeight: 700,
        },
      });
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
    },
  },
);
