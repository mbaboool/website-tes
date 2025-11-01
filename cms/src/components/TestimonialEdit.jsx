import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';
import { Box, Typography, Paper } from '@mui/material';
import { SmartFormToolbar } from './SmartFormToolbar'; // Sesuaikan path jika berbeda
import { smartValidation } from '../utils/notifications'; // Sesuaikan path jika berbeda
import FileInputSupabase from './FileInputSupabase'; // Pastikan path benar

// Definisikan validasi (sama seperti Create)
const nameValidation = [required(), (value) => {
    if (value && value.length < 2) {
        return 'Nama harus memiliki setidaknya 2 karakter';
    }
    return undefined;
}];
const companyValidation = [required(), (value) => {
    if (value && value.length < 2) {
        return 'Nama perusahaan harus memiliki setidaknya 2 karakter';
    }
    return undefined;
}];
const testimonialValidation = [required(), (value) => {
    if (value && value.length < 10) {
        return 'Testimoni harus memiliki setidaknya 10 karakter';
    }
    return undefined;
}];
// Saat edit, gambar bisa opsional
const imageValidation = []; // Jadikan opsional untuk edit

export const TestimonialEdit = (props) => (
    <Edit
        {...props}
        title="Edit Testimoni"
    >
        <SimpleForm
            toolbar={<SmartFormToolbar {...props} />}
            sx={{
                maxWidth: '800px',
                mx: 'auto',
                px: 2,
                pb: 3,
            }}
        >
            <Paper
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: '16px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0'
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#0f172a' }}>
                    Edit Testimoni Pelanggan
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom paragraph>
                    Perbarui testimoni pelanggan yang ditampilkan di situs Anda.
                </Typography>

                <FileInputSupabase
                    source="image"
                    label="Ganti Foto Profil (Opsional)"
                    bucketName="images"
                    folderPath="testimonials/"
                    validate={imageValidation} // Jadikan opsional
                    helperText="Unggah foto profil baru (maks. 5MB) atau kosongkan jika ingin mempertahankan foto saat ini."
                    sx={{ mb: 2 }}
                />
                <TextInput
                    source="name"
                    label="Nama Pelanggan *"
                    fullWidth
                    validate={nameValidation}
                    helperText="Masukkan nama lengkap atau nama panggilan pelanggan."
                    sx={{ mb: 2 }}
                />
                 <TextInput
                    source="company"
                    label="Nama Perusahaan *"
                    fullWidth
                    validate={companyValidation}
                    helperText="Masukkan nama perusahaan atau organisasi pelanggan."
                    sx={{ mb: 2 }}
                />
                <TextInput
                    source="testimonial"
                    label="Isi Testimoni *"
                    multiline
                    rows={4}
                    fullWidth
                    validate={testimonialValidation}
                    helperText="Tulis atau edit testimoni pelanggan (minimal 10 karakter)."
                    sx={{ mb: 2 }}
                />
            </Paper>
        </SimpleForm>
    </Edit>
);