module.exports = {
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  output: './',
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.ts', '.tsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
    },
    lngs: ['en', 'ru'],
    defaultLng: 'ru',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'src/translations/{{lng}}.json',
      savePath: 'src/translations/{{lng}}.json',
    },
    keySeparator: false,
    nsSeparator: false,
  },
};
