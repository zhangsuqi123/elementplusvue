import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n()
export function $t(value) {
    return t(value)
}

export function setLocale(value) {
    locale.value = value
}