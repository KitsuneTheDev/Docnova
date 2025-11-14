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
            "invoiceMenuLabel": "Faturalar",
            "logoutMessage": "Çıkış yapılıyor.",
            "logoutButtonLabel": "Çıkış Yap",
            "dataError": "Veri Hatası",

            // Home
            "invoiceListTitle": "Fatura Listesi",
            "tableHeaders": {
                "invoiceNumber": "Fatura Numarası",
                "supplier": "Tedarikçi",
                "date": "Tarih",
                "amount": "Tutar",
                "paymentStatus": "Ödeme Durumu",
                "details": "Detaylar",
                "paymentPending": "BEKLEMEDE",
            },
            "invoiceLoading": "Faturalar yükleniyor...",
            "alertInfo": "Bilgi",
            "noData": "Görüntülenecek kayıt bulunamadı.",

            // Login
            "LoginTitle": "Sistem Girişi",
            "emailPlaceholder": "E-posta",
            "passwordPlaceholder": "Şifre",
            "loginButton": "Giriş Yap",
            "requiredEmail": "Geçerli e-posta giriniz.",
            "requiredPassword": "Geçerli şifre giriniz.",
            "loginMessage": "Giriş Yapılıyor...",
            "loginErrorMessage": "Login Error",

            // Details
            "loadingInvoices": "Faturalar Yükleniyor...",
            "invoiceDetailsTitle": "Fatura Detayları",
            "invoiceNotFound": "Fatura Bulunamadı.",
            "invoiceNotFoundDetails": "ile eşleşen fatura kaydı bulunamadı.",
            "detailsHeaders": {
                "generalTitle": "Genel Bilgiler",
                "invoiceNumber": "Fatura Numarası",
                "status": "Durum",
                "type": "Tür",
                "issueDate": "Düzenlenme Tarihi",
                "dueDate": "Vade Tarihi",
                "createdDate": "Oluşturulma Tarihi",
                "financialTitle": "Mali Bilgiler",
                "totalAmount": "Toplam Tutar",
                "payableAmount": "Ödenecek Tutar",
                "taxExc": "Vergi Hariç Tutar",
                "paymentStatus": "Ödeme Durumu",
                "supplierTitle": "Taraf Bilgileri",
                "supplierName": "Tedarikçi İsmi",
                "customerName": "Müşteri İsmi",
                "supplierCountry": "Tedarikçi Ülke Kodu",
                "customerCountry": "Müşteri Ülke Kodu",
            }
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
            "invoiceMenuLabel": "Invoices",
            "logoutMessage": "Loggin out.",
            "logoutButtonLabel": "Logout",
            "dataError": "Data Error",

            // Home
            "invoiceListTitle": "Invoice List",
            "tableHeaders": {
                "invoiceNumber": "Invoice Number",
                "supplier": "Supplier",
                "date": "Date",
                "amount": "Amount",
                "paymentStatus": "Payment Status",
                "details": "Details",
                "paymentPending": "PENDING",
            },
            "invoiceLoading": "Loading Invoices...",
            "alertInfo": "Info",
            "noData": "No record to display.",

            // Login
            "LoginTitle": "System Login",
            "emailPlaceholder": "E-mail",
            "passwordPlaceholder": "Password",
            "loginButton": "Login",
            "requiredEmail": "Enter a valid e-mail.",
            "requiredPassword": "Enter a valid password.",
            "loginMessage": "Logging in...",
            "loginErrorMessage": "Login Error",

            // Details
            "loadingInvoices": "Loading Invoices...",
            "invoiceDetailsTitle": "Invoice Details",
            "invoiceNotFound": "Invoice Not Found.",
            "invoiceNotFoundDetails": "did not match with any invoice record.",
            "detailsHeaders": {
                "generalTitle": "General Details",
                "invoiceNumber": "Invoice Number",
                "status": "Status",
                "type": "Type",
                "issueDate": "Issue Date",
                "dueDate": "Due Date",
                "createdDate": "Created Time",
                "financialTitle": "Financial Details",
                "totalAmount": "Total Amount",
                "payableAmount": "Payable Amount",
                "taxExc": "Tax Excluded Amount",
                "paymentStatus": "Payment Status",
                "supplierTitle": "Party Details",
                "supplierName": "Supplier Name",
                "customerName": "Customer Name",
                "supplierCountry": "Supplier Country Code",
                "customerCountry": "Customer Country Code",
            }
        }
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        react: {
            useSuspense: false,
        },
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