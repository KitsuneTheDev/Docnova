import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    tr: {
        translation: {
            // Global
            "appName": "DockNova",
            "logout": "Çıkış Yap",
            "loading": "Yükleniyor...",
            "errorTitle": "Hata",
            "backToList": "Fatura Listesi",

            // Home
            "invoiceListTitle": "Fatura Listesi",
            "tableHeaders": {
                "invoiceNumber": "Fatura Numarası",
                "supplier": "Tedarikçi",
                "date": "Tarih",
                "amount": "Tutar",
                "paymentStatus": "Ödeme Durumu",
                "details": "Detaylar",
            },
            "noData": "Görüntülenecek kayıt bulunamadı.",

            // Login
            "LoginTitle": "Sistem Girişi",
            "emailPlaceholder": "E-posta",
            "passwordPlaceholder": "Şifre",
            "loginButton": "Giriş Yap",
            "requiredEmail": "Geçerli e-posta giriniz.",
            "requiredPassword": "Geçerli şifre giriniz.",
        }
    },
    en: {
        translation: {
            // Global
            "appName": "DockNova",
            "logout": "Logout",
            "loading": "Loading...",
            "errorTitle": "Error",
            "backToList": "Invoice List",

            // Home
            "invoiceListTitle": "Invoice List",
            "tableHeaders": {
                "invoiceNumber": "Invoice Number",
                "supplier": "Supplier",
                "date": "Date",
                "amount": "Amount",
                "paymentStatus": "Payment Status",
                "details": "Details",
            },
            "noData": "No record to display.",

            // Login
            "LoginTitle": "System Login",
            "emailPlaceholder": "E-mail",
            "passwordPlaceholder": "Password",
            "loginButton": "Login",
            "requiredEmail": "Enter a valid e-mail.",
            "requiredPassword": "Enter a valid password.",   
        }
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "tr",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        }
    });

    export default i18n;