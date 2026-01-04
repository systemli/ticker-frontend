import { render, RenderOptions } from '@testing-library/react'
import { FC, ReactElement } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import en from './i18n/locales/en.json'

// Initialize a mock i18n instance for tests using the actual translation file
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

interface I18nProviderProps {
  children: ReactElement
}

const I18nProvider: FC<I18nProviderProps> = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

// Custom render function that includes the I18nProvider
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: I18nProvider, ...options })

export * from '@testing-library/react'
export { customRender as render }