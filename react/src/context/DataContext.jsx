// src/context/DataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../config/supabase';

// Create the context
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
    const [siteData, setSiteData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSiteData = async () => {
            try {
                // Fetch all data in parallel
                const [
                    settingsRes,
                    socialsRes,
                    eventsRes,
                    galleryRes,
                    bookDetailsRes
                ] = await Promise.all([
                    supabase.from('site_settings').select('key, value'),
                    supabase.from('social_links').select('*').order('id', { ascending: true }),
                    supabase.from('events').select('*').order('date', { ascending: false }),
                    supabase.from('gallery_items').select('*').order('id', { ascending: true }),
                    supabase.from('book_details').select('*').order('sort_order', { ascending: true })
                ]);

                // Error handling
                if (settingsRes.error) throw settingsRes.error;
                if (socialsRes.error) throw socialsRes.error;
                if (eventsRes.error) throw eventsRes.error;
                if (galleryRes.error) throw galleryRes.error;
                if (bookDetailsRes.error) throw bookDetailsRes.error;

                // Process settings into a simple key-value object
                const settings = settingsRes.data.reduce((acc, setting) => {
                    acc[setting.key] = setting.value;
                    return acc;
                }, {});

                // Structure the data similar to content.json
                const structuredData = {
                    hero: {
                        title: settings.hero_title,
                        subtitle: settings.hero_subtitle,
                    },
                    profile: {
                        name: settings.profile_name,
                        bio: settings.profile_bio,
                        youtubeUrl: settings.profile_youtube_url,
                        profilePic: settings.profile_pic_path,
                        email: settings.profile_email,
                        phone: settings.profile_phone,
                        socials: socialsRes.data,
                    },
                    book: {
                        title: settings.book_title,
                        image: settings.book_image_path,
                        description: settings.book_description,
                        buyLink: settings.book_buy_link,
                        details: bookDetailsRes.data.map(d => d.detail),
                    },
                    events: {
                        title: settings.events_title,
                        items: eventsRes.data,
                    },
                    gallery: {
                        title: settings.gallery_title,
                        items: galleryRes.data,
                    },
                    footer: {
                        tagline: settings.footer_tagline,
                    },
                    // We keep these form structures static as they are part of the UI
                    consultation: {
                        title: "KONSULTASI LANGSUNG DENGAN BAGUS BARAJA",
                        subtitle: "JADWALKAN KONSULTASI ANDA",
                        fields: {
                          name: "Nama Lengkap",
                          whatsapp: "No. WhatsApp",
                          date: "Tanggal Konsultasi",
                          time: "Waktu Konsultasi",
                          problem: "Permasalahan Utama"
                        },
                        timeOptions: [
                          "09:00-11.00 WIB",
                          "13:00-15.00 WIB",
                          "19:30-21.30 WIB"
                        ],
                        buttonText: "Kirim ke WhatsApp Admin"
                    },
                    testimonial_form: {
                        title: "Kirim Testimoni Anda",
                        subtitle: "Bagikan pengalaman Anda bersama kami",
                        fields: {
                          name: "Nama Anda",
                          source: "Asal (Contoh: Peserta Webinar, Alumni Bootcamp, Peserta Privat)",
                          message: "Tuliskan testimoni Anda di sini..."
                        },
                        buttonText: "Kirim Testimoni"
                    }
                };

                setSiteData(structuredData);
            } catch (error) {
                console.error("Error fetching site data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSiteData();
    }, []);

    return (
        <DataContext.Provider value={{ siteData, loading }}>
            {children}
        </DataContext.Provider>
    );
};

// Create a custom hook to use the context
export const useSiteData = () => {
    return useContext(DataContext);
};
