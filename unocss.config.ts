import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { themeShortcuts } from './theme/shortcuts'

export default defineConfig({
  shortcuts: [themeShortcuts],
  rules: [
    [/^view-transition-([\w-]+)$/, ([, name]) => ({ 'view-transition-name': name, 'contain': 'layout' })],
  ],
  theme: {
    colors: {
      primary: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
    },

  },

  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Quicksand', 'Quicksand:400,500,700,900'],
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
