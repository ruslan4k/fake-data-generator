module.exports = {
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'public/**/*.html',
  ],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    spacing: {
      px: '1px',
      0: '0',
      1: '0.1rem',
      2: '0.2rem',
      3: '0.3rem',
      4: '0.4rem',
      5: '0.5rem',
      6: '0.6rem',
      8: '0.8rem',
      10: '1rem',
      12: '1.2rem',
      16: '1.6rem',
      20: '2rem',
      24: '2.4rem',
      32: '3.2rem',
      40: '4rem',
      48: '4.8rem',
      56: '5.6rem',
      64: '6.4rem',
    },
  },
  variants: {},
  plugins: [],
};
