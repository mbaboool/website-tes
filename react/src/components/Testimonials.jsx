import React, { useState, useEffect } from 'react';
import supabase from '../config/supabase';
import './Testimonials.css';

// --- KEYWORD LISTS ---
const positiveKeywords = [
    'terkabul', 'berhasil', 'luar biasa', 'ajaib', 'terbukti', 'dahsyat', 'mantap', 
    'rekomendasi', 'terbaik', 'spektakuler', 'mengubah hidup', 'bersyukur', 'terima kasih', 
    'manjur', 'solusi', 'tercapai', 'impian', 'harapan', 'nyata', 'keajaiban', 'positif',
    'berkah', 'rezeki', 'lunas', 'sukses', 'bahagia', 'tenang', 'damai', 'ikhlas'
];

const negativeKeywords = [
    'bohong', 'penipu', 'rugi', 'jelek', 'tidak berhasil', 'hoax',
    'palsu', 'negatif', 'buruk', 'sara', 'jangan', 'tidak', 'bukan'
];

const Testimonials = () => {
    const [allTestimonials, setAllTestimonials] = useState([]);
    const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
    const [displayCount, setDisplayCount] = useState(window.innerWidth <= 768 ? 6 : 15);

    useEffect(() => {
        const updateDisplayCount = () => {
            setDisplayCount(window.innerWidth <= 768 ? 6 : 15);
        };
        
        window.addEventListener('resize', updateDisplayCount);
        
        return () => window.removeEventListener('resize', updateDisplayCount);
    }, []);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                // Ambil data dari tabel testimonials di Supabase
                const { data, error } = await supabase
                    .from('testimonials')
                    .select('*')
                    .order('created_at', { ascending: false }); // Urutkan dari terbaru ke terlama

                if (error) throw error;

                // Format data agar sesuai dengan struktur yang diharapkan
                const testimonialsList = await Promise.all(data.map(async (row) => {
                    let photoUrl = null;
                    
                    // Jika photo_path disimpan dan bukan URL langsung, buat URL publik
                    if (row.photo_path) {
                        // Jika row.photo_path sudah merupakan URL publik, gunakan langsung
                        if (row.photo_path.startsWith('http')) {
                            photoUrl = row.photo_path;
                        } else {
                            // Jika hanya nama file, buat URL publik
                            const { data: publicUrlData } = supabase
                                .storage
                                .from('testimonials')
                                .getPublicUrl(row.photo_path);
                            
                            photoUrl = publicUrlData.publicUrl;
                        }
                    }
                    
                    return {
                        id: row.id,
                        name: row.name,
                        source: row.source,
                        feedback: row.feedback,
                        photo_path: photoUrl,
                        createdAt: new Date(row.created_at) // Supabase menggunakan format ISO string
                    };
                }));

                console.log('Testimonials fetched:', testimonialsList); // Log untuk debugging
                setAllTestimonials(testimonialsList);
            } catch (error) {
                console.error("Error fetching testimonials: ", error);
            }
        };
        fetchTestimonials();
    }, []);

    useEffect(() => {
        if (allTestimonials.length === 0) return;

        const smartSelect = () => {
            // 1. Filter out negative testimonials
            const filteredTestimonials = allTestimonials.filter(testimonial => {
                const feedbackText = testimonial.feedback.toLowerCase();
                return !negativeKeywords.some(keyword => feedbackText.includes(keyword));
            });

            // 2. Score the remaining testimonials
            const scoredTestimonials = filteredTestimonials.map(testimonial => {
                const feedbackText = testimonial.feedback.toLowerCase();
                let score = 0;
                positiveKeywords.forEach(keyword => {
                    if (feedbackText.includes(keyword)) {
                        score++;
                    }
                });
                return { ...testimonial, score };
            });

            // 3. Sort by score (desc) and then by date (desc)
            scoredTestimonials.sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
            });

            // 4. Take the top testimonials up to the display count
            setDisplayedTestimonials(scoredTestimonials.slice(0, displayCount));
        };

        smartSelect();

    }, [allTestimonials, displayCount]);

    return (
        <section id="testimonials" className="section testimonials-section">
            <h2 className="title">Apa Kata Mereka</h2>
            <div className="testimonial-grid">
                {displayedTestimonials.map((testimonial, index) => (
                    <div 
                        className="testimonial-item" 
                        key={testimonial.id} 
                        style={{
                            '--delay': `${index * 0.5}s`
                        }}
                    >
                        {testimonial.photo_path && (
                            <div className="testimonial-photo">
                                <img 
                                    src={decodeURIComponent(testimonial.photo_path)} 
                                    alt={`Foto dari ${testimonial.name}`} 
                                    onError={(e) => {
                                        console.error('Error loading image:', decodeURIComponent(testimonial.photo_path));
                                        e.target.style.display = 'none';
                                    }}
                                    onLoad={(e) => {
                                        console.log('Image loaded successfully:', decodeURIComponent(testimonial.photo_path));
                                    }}
                                />
                            </div>
                        )}
                        <p className="feedback">"{testimonial.feedback}"</p>
                        <div className="author-info">
                            <p className="author">- {testimonial.name}</p>
                            <p className="source">({testimonial.source})</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;