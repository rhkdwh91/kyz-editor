const postcss = require('rollup-plugin-postcss');
const svg = require('rollup-plugin-svg');
const replace = require('@rollup/plugin-replace');

module.exports = {
  rollup(config, options) {
    const external = config.external;
    config.external = (id) => (id.match(/.svg$/) ? false : external(id));
    config.plugins.push(
      svg({
        base64: false,
      }),
      postcss({
        plugins: [],
      }),
      replace({
        preventAssignment: true,
      })
    );
    config.inlineDynamicImports = true;
    return config;
  },
};
