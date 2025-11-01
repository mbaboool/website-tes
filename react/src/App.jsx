import React, { useState, useEffect } from 'react';
import validator from 'validator';
import './index.css';
import Profile from './components/Profile';
import Fluid from './components/Fluid';
import SocialIcon from './components/SocialIcon';
import Countdown from './components/Countdown';
import Testimonials from './components/Testimonials';
import supabase from './config/supabase';
import { useSiteData } from './context/DataContext';

const Navbar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [navVisible, setNavVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.section');
            let current = 'home';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            setActiveLink(current);

            const heroSection = document.getElementById('home');
            const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
            setNavVisible(window.scrollY > heroHeight * 0.8);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuActive(!menuActive);
    const closeMenu = () => setMenuActive(false);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed navbar height
                behavior: 'smooth'
            });
        }
        if (history.pushState) {
            history.pushState(null, null, window.location.pathname);
        }
        closeMenu();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar')) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={`navbar ${navVisible ? 'visible' : ''}`}>
            <div className="nav-container">
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="logo">Rahasia Keajaiban Doa</a>
                <ul className={`nav-links ${menuActive ? 'active' : ''}`} id="navLinks">
                    <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeLink === 'about' ? 'active' : ''}>Profil</a></li>
                    <li><a href="#book" onClick={(e) => handleNavClick(e, 'book')} className={activeLink === 'book' ? 'active' : ''}>Buku</a></li>
                    <li><a href="#events" onClick={(e) => handleNavClick(e, 'events')} className={activeLink === 'events' ? 'active' : ''}>Acara</a></li>
                    <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')} className={activeLink === 'gallery' ? 'active' : ''}>Galeri</a></li>
                    <li><a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')} className={activeLink === 'testimonials' ? 'active' : ''}>Testimoni</a></li>
                    <li><a href="#consultation" onClick={(e) => handleNavClick(e, 'consultation')} className={activeLink === 'consultation' ? 'active' : ''}>Konsultasi</a></li>
                </ul>
                <button className="menu-toggle" id="menuToggle" onClick={toggleMenu}>&#8801;</button>
            </div>
        </nav>
    );
};

const Home = ({ hero }) => {
    const handleHeroClick = (e) => {
        e.preventDefault();
        const targetElement = document.getElementById('about');
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed navbar height
                behavior: 'smooth'
            });
        }
        if (history.pushState) {
            history.pushState(null, null, window.location.pathname);
        }
    };

    return (
        <section id="home" className="section">
            <Fluid />
            <div className="hero-content">
                <h1>{hero.title}</h1>
                <p className="hero-subtitle">{hero.subtitle}</p>
                <a href="#about" onClick={handleHeroClick} className="hero-button">PELAJARI LEBIH DALAM</a>
            </div>
        </section>
    );
};

const About = ({ profile }) => (
    <section id="about" className="section">
        <Profile profileData={profile} />
    </section>
);

const Book = ({ book }) => (
    <section id="book" className="section">
        <div className="book-container">
            <div className="book-cover">
                <img src={book.image} alt={book.title} />
            </div>
            <div className="book-info">
                <h2>{book.title}</h2>
                <p className="book-description">{book.description}</p>
                <ul className="book-details">
                    {book.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
                <a href={book.buyLink} className="buy-button"target="_blank" 
                 rel="noopener noreferrer">Dapatkan Sekarang</a>
            </div>
        </div>
    </section>
);

const Events = ({ events }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({ name: '', whatsapp: '' });
    const [errors, setErrors] = useState({});
    const [lightboxImage, setLightboxImage] = useState(null);

    const isValidFutureDate = (dateString) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        // Check if the date is valid and if it's in the future
        return !isNaN(date.getTime()) && date > new Date();
    };

    const openModal = (event) => {
        setSelectedEvent(event);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedEvent(null);
        setFormData({ name: '', whatsapp: '' });
        setErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const adminWhatsApp = '6285150757558';
        const message = `Halo, saya ingin mendaftar untuk acara "${selectedEvent.title}".\nNama: ${formData.name}\nNo. WhatsApp: ${formData.whatsapp}`;
        const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        closeModal();
    };

    const openLightbox = (image) => {
        setLightboxImage(image);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    return (
        <section id="events" className="section">
            <div className="container">
                <h2>{events.title}</h2>
                <div className="events-container">
                    {events.items.map((event, index) => (
                        <div key={index} className="event-card">
                            <img 
                                src={event.image} 
                                alt={event.title} 
                                className="event-image"
                                onClick={() => openLightbox(event.image)}
                            />
                            <div className="event-info">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                {isValidFutureDate(event.date) ? (
                                    <Countdown targetDate={event.date} />
                                ) : (
                                    <div className="coming-soon">Segera Hadir</div>
                                )}
                                <button onClick={() => openModal(event)} className="register-button">Daftar Sekarang</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalIsOpen && selectedEvent && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>&times;</button>
                        <h3>Pendaftaran: {selectedEvent.title}</h3>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Nama Lengkap" 
                                value={formData.name}
                                onChange={handleInputChange}
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <div className="error-message">{errors.name}</div>}
                            <input 
                                type="tel" 
                                name="whatsapp" 
                                placeholder="No. WhatsApp (e.g., 08123456789)" 
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                                className={errors.whatsapp ? 'error' : ''}
                            />
                            {errors.whatsapp && <div className="error-message">{errors.whatsapp}</div>}
                            <button type="submit" className="submit-button">Daftar via WhatsApp</button>
                        </form>
                    </div>
                </div>
            )}

            {lightboxImage && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="close-lightbox" onClick={closeLightbox}>&times;</button>
                    <img src={lightboxImage} alt="Full size view" className="lightbox-image" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </section>
    );
};

const Gallery = ({ gallery }) => {
    const items = gallery.items;
    const numItems = items.length;
    const angle = 360 / numItems;
    const translateZ = 500; // As per the original template's CSS
    const [rotation, setRotation] = useState(0);
    const rotationSpeed = 0.04; // Adjust speed here

    useEffect(() => {
        let animationFrameId;
        const animate = () => {
            setRotation(prevRotation => prevRotation + rotationSpeed);
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <section id="gallery" className="section">
            <div className="container">
                <h2>{gallery.title}</h2>
                <div className="carousel-container-3d">
                    <div 
                                    id="carousel-3d"
                                    style={{
                                        transform: `rotateY(${rotation}deg)`,
                                        transformStyle: 'preserve-3d'
                                    }}                    >
                        {items.map((item, index) => (
                            <figure 
                                key={index} 
                                style={{ 
                                    transform: `rotateY(${index * angle}deg) translateZ(${translateZ}px)` 
                                }}
                            >
                                <img src={item.image} alt={item.caption || `Gallery image ${index + 1}`} />
                                <figcaption>{item.caption}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Consultation = ({ consultation, testimonial_form }) => {
    const [consultationData, setConsultationData] = useState({
        name: '',
        whatsapp: '',
        date: '',
        time: '',
        problem: ''
    });

    const [consultationErrors, setConsultationErrors] = useState({});
    
    const [testimonialData, setTestimonialData] = useState({
        name: '',
        source: '',
        message: '',
        photoFile: null,
        photoPreview: null
    });
    
    const [testimonialErrors, setTestimonialErrors] = useState({});
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleConsultationChange = (e) => {
        const { name, value } = e.target;
        setConsultationData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (consultationErrors[name]) {
            setConsultationErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleTestimonialChange = (e) => {
        const { name, value } = e.target;
        setTestimonialData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (testimonialErrors[name]) {
            setTestimonialErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            // Validasi ukuran file
            if (file.size > 1000 * 1024) { // 1 MB dalam bytes
                alert('Ukuran file terlalu besar. Maksimal 1MB.');
                return;
            }
            
            // Validasi tipe file
            if (!file.type.startsWith('image/')) {
                alert('Hanya file gambar yang diperbolehkan.');
                return;
            }
            
            // Buat preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setTestimonialData(prev => ({
                    ...prev,
                    photoFile: file,
                    photoPreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setTestimonialData(prev => ({
            ...prev,
            photoFile: null,
            photoPreview: null
        }));
    };

    const validateConsultationForm = () => {
        const newErrors = {};
        
        if (!consultationData.name.trim()) {
            newErrors.name = 'Nama wajib diisi';
        }
        
        if (!consultationData.whatsapp.trim()) {
            newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
        } else if (!validator.isMobilePhone(consultationData.whatsapp, 'id-ID')) {
            newErrors.whatsapp = 'Format nomor WhatsApp tidak valid';
        }
        
        if (!consultationData.date) {
            newErrors.date = 'Tanggal wajib dipilih';
        }
        
        if (!consultationData.time) {
            newErrors.time = 'Waktu wajib dipilih';
        }
        
        if (!consultationData.problem.trim()) {
            newErrors.problem = 'Permasalahan wajib diisi';
        }
        
        setConsultationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateTestimonialForm = () => {
        const newErrors = {};
        
        if (!testimonialData.name.trim()) {
            newErrors.name = 'Nama wajib diisi';
        }
        
        if (!testimonialData.source.trim()) {
            newErrors.source = 'Sumber wajib diisi';
        }
        
        if (!testimonialData.message.trim()) {
            newErrors.message = 'Testimoni wajib diisi';
        } else if (testimonialData.message.length > 300) {
            newErrors.message = 'Testimoni maksimal 300 karakter';
        }
        
        setTestimonialErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConsultationSubmit = (e) => {
        e.preventDefault();
        const adminWhatsApp = '6285150757558';
        const message = `PENGAJUAN KONSULTASI PRIVAT BARU:\n\nNama: ${consultationData.name}\nNo. WhatsApp: ${consultationData.whatsapp}\nTanggal: ${consultationData.date}\nWaktu: ${consultationData.time}\nPermasalahan: ${consultationData.problem}`;
        const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleTestimonialSubmit = async (e) => {
        e.preventDefault();
        if (!validateTestimonialForm()) return;
        
        if (isSubmitting) return;
        setIsSubmitting(true);
        setSubmitMessage('');

        let photoPath = null;

        try {
            // Jika ada foto, upload ke Supabase Storage
            if (testimonialData.photoFile) {
                // Generate unique filename - ganti spasi dan karakter khusus
                const cleanFileName = testimonialData.photoFile.name
                    .replace(/\s+/g, '_') // Ganti spasi dengan underscore
                    .replace(/[^a-zA-Z0-9._-]/g, ''); // Hapus karakter khusus
                const fileName = `testimonial-${Date.now()}-${cleanFileName}`;
                
                const { data: uploadData, error: uploadError } = await supabase
                    .storage
                    .from('testimonials')
                    .upload(fileName, testimonialData.photoFile, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) throw uploadError;

                // Dapatkan public URL dari file yang diupload
                const { data: publicUrlData } = supabase
                    .storage
                    .from('testimonials')
                    .getPublicUrl(fileName);

                photoPath = publicUrlData.publicUrl;
            }

            // Simpan testimonial ke database
            const { data: insertData, error: insertError } = await supabase
                .from('testimonials')
                .insert([{
                    name: testimonialData.name,
                    source: testimonialData.source,
                    feedback: testimonialData.message,
                    photo_path: photoPath
                }]);

            if (insertError) throw insertError;
            
            setSubmitMessage('Terima kasih, testimoni Anda telah berhasil dikirim.');
            setTestimonialData({ name: '', source: '', message: '', photoFile: null, photoPreview: null });
        } catch (error) {
            console.error("Error adding testimonial: ", error);
            setSubmitMessage(`Terjadi kesalahan: ${error.message} (Status: ${error.status || 'unknown'})`);
            setTestimonialData({ name: '', source: '', message: '', photoFile: null, photoPreview: null });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitMessage(''), 5000);
        }
    };

    return (
        <section id="consultation" className="section">
            <div className="consultation-section-container">
                <div className="consultation-column">
                    <div className="consultation-container">
                        <h2>{consultation.title}</h2>
                        <p>{consultation.subtitle}</p>
                        <form onSubmit={handleConsultationSubmit} className="consultation-form">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder={consultation.fields.name} 
                                value={consultationData.name} 
                                onChange={handleConsultationChange} 
                                className={consultationErrors.name ? 'error' : ''}
                            />
                            {consultationErrors.name && <div className="error-message">{consultationErrors.name}</div>}
                            <input 
                                type="tel" 
                                name="whatsapp" 
                                placeholder={consultation.fields.whatsapp} 
                                value={consultationData.whatsapp} 
                                onChange={handleConsultationChange} 
                                className={consultationErrors.whatsapp ? 'error' : ''}
                            />
                            {consultationErrors.whatsapp && <div className="error-message">{consultationErrors.whatsapp}</div>}
                            <input 
                                type="date" 
                                name="date" 
                                placeholder={consultation.fields.date} 
                                value={consultationData.date} 
                                onChange={handleConsultationChange} 
                                className={consultationErrors.date ? 'error' : ''}
                            />
                            {consultationErrors.date && <div className="error-message">{consultationErrors.date}</div>}
                            <select 
                                name="time" 
                                value={consultationData.time} 
                                onChange={handleConsultationChange} 
                                className={consultationErrors.time ? 'error' : ''}
                                required
                            >
                                <option value="" disabled>{consultation.fields.time}</option>
                                {consultation.timeOptions.map(time => <option key={time} value={time}>{time}</option>)} 
                            </select>
                            {consultationErrors.time && <div className="error-message">{consultationErrors.time}</div>}
                            <textarea 
                                name="problem" 
                                placeholder={consultation.fields.problem} 
                                value={consultationData.problem} 
                                onChange={handleConsultationChange} 
                                className={consultationErrors.problem ? 'error' : ''}
                                required
                            ></textarea>
                            {consultationErrors.problem && <div className="error-message">{consultationErrors.problem}</div>}
                            <button type="submit" className="buy-button">{consultation.buttonText}</button>
                        </form>
                    </div>
                </div>
                <div className="testimonial-column">
                    <div className="consultation-container">
                        <h2>{testimonial_form.title}</h2>
                        <p>{testimonial_form.subtitle}</p>
                        <form onSubmit={handleTestimonialSubmit} className="consultation-form">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder={testimonial_form.fields.name} 
                                value={testimonialData.name} 
                                onChange={handleTestimonialChange} 
                                className={testimonialErrors.name ? 'error' : ''}
                                required 
                            />
                            {testimonialErrors.name && <div className="error-message">{testimonialErrors.name}</div>}
                            <input 
                                type="text" 
                                name="source" 
                                placeholder={testimonial_form.fields.source} 
                                value={testimonialData.source} 
                                onChange={handleTestimonialChange} 
                                className={testimonialErrors.source ? 'error' : ''}
                                required 
                            />
                            {testimonialErrors.source && <div className="error-message">{testimonialErrors.source}</div>}
                            <textarea 
                                name="message" 
                                placeholder={testimonial_form.fields.message} 
                                value={testimonialData.message} 
                                onChange={handleTestimonialChange} 
                                className={testimonialErrors.message ? 'error' : ''}
                                required 
                                maxLength="300"
                            ></textarea>
                            {testimonialErrors.message && <div className="error-message">{testimonialErrors.message}</div>}
                            <div className="char-counter">{testimonialData.message.length} / 300</div>
                            <div className="file-upload">
                                <label htmlFor="photo-upload" className="file-upload-label">
                                    Pilih Foto (maks 1MB)
                                </label>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="file-upload-input"
                                />
                                {testimonialData.photoPreview && (
                                    <div className="photo-preview-container">
                                        <img 
                                            src={testimonialData.photoPreview} 
                                            alt="Pratinjau foto" 
                                            className="photo-preview"
                                        />
                                        <button 
                                            type="button" 
                                            className="remove-photo-btn"
                                            onClick={removePhoto}
                                        >
                                            Hapus Foto
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="buy-button" disabled={isSubmitting}>
                                {isSubmitting ? 'Mengirim...' : testimonial_form.buttonText}
                            </button>
                            {submitMessage && <p className="submit-message">{submitMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = ({ footer, profile }) => {
    const handleBackToTop = (e) => {
        e.preventDefault();
        const targetElement = document.getElementById('home');
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
        if (history.pushState) {
            history.pushState(null, null, window.location.pathname);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section footer-brand">
                        <h3>Bagus Baraja</h3>
                        <p>{footer.tagline}</p>
                    </div>
                    <div className="footer-section">
                        <h3>Kontak</h3>
                        <a href={`mailto:${profile.email}`} className="contact-item">
                            <SocialIcon name="email" />
                            <span>{profile.email}</span>
                        </a>
                        <a href={`tel:${profile.phone}`} className="contact-item">
                            <SocialIcon name="phone" />
                            <span>{profile.phone}</span>
                        </a>
                    </div>
                    <div className="footer-section">
                        <h3>Ikuti Kami</h3>
                        <div className="social-links">
                            {profile.socials.map(social => (
                                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                    <SocialIcon name={social.name} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 Rahasia Keajaiban Doa. All rights reserved.</p>
                    <a href="#home" onClick={handleBackToTop} className="back-to-top">Kembali ke Atas &uarr;</a>
                </div>
            </div>
        </footer>
    );
};

function App() {
  const { siteData, loading } = useSiteData();

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a', color: 'white' }}><h2>Memuat data...</h2></div>;
  }

  if (!siteData) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a', color: 'white' }}><h2>Gagal memuat data. Silakan coba lagi nanti.</h2></div>;
  }

  return (
    <>
      <Navbar />
      <Home hero={siteData.hero} />
      <About profile={siteData.profile} />
      <Book book={siteData.book} />
      <Events events={siteData.events} />
      <Gallery gallery={siteData.gallery} />
      <Testimonials />
      <Consultation consultation={siteData.consultation} testimonial_form={siteData.testimonial_form} />
      <Footer footer={siteData.footer} profile={siteData.profile} />
    </>
  );
}

export default App;