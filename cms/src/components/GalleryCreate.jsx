import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';
import { Box, Typography, Paper } from '@mui/material';
import { SmartFormToolbar } from './SmartFormToolbar'; // Sesuaikan path jika berbeda
import FileInputSupabase from './FileInputSupabase'; // Pastikan path benar

// Definisikan validasi
const captionValidation = [required(), (value) => {
    if (value && value.length < 3) {
        return 'Keterangan harus memiliki setidaknya 3 karakter';
    }
    return undefined;
}];
const imageValidation = [required()]; // Gambar wajib

export const GalleryCreate = (props) => (
    <Create
        {...props}
        title="Tambah Gambar ke Galeri"
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
                    Tambahkan Gambar ke Galeri
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom paragraph>
                    Unggah gambar baru ke galeri Anda dengan menambahkan keterangan yang menarik.
                </Typography>

                <FileInputSupabase
                    source="image"
                    label="Unggah Gambar *"
                    bucketName="images" // Ganti dengan bucket yang sesuai
                    folderPath="gallery/"
                    validate={imageValidation}
                    helperText="Pilih gambar untuk ditambahkan ke galeri (maks. 5MB). Format: JPG, PNG."
                    sx={{ mb: 2 }}
                />
                <TextInput
                    source="caption"
                    label="Keterangan Gambar *"
                    multiline
                    rows={2}
                    fullWidth
                    validate={captionValidation}
                    helperText="Tambahkan keterangan atau judul singkat untuk gambar ini (minimal 3 karakter)."
                    sx={{ mb: 2 }}
                />
            </Paper>
        </SimpleForm>
    </Create>
);