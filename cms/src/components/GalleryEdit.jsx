import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';
import { Box, Typography, Paper } from '@mui/material';
import { SmartFormToolbar } from './SmartFormToolbar'; // Sesuaikan path jika berbeda
import FileInputSupabase from './FileInputSupabase'; // Pastikan path benar

// Definisikan validasi (sama seperti Create)
const captionValidation = [required(), (value) => {
    if (value && value.length < 3) {
        return 'Keterangan harus memiliki setidaknya 3 karakter';
    }
    return undefined;
}];
// Saat edit, gambar mungkin opsional jika tidak ingin diganti
// Kita bisa tetap menggunakan validasi wajib jika memang harus selalu ada
// Atau buat validasi opsional jika hanya update caption
const imageValidation = []; // Jadikan opsional untuk edit

export const GalleryEdit = (props) => (
    <Edit
        {...props}
        title="Edit Item Galeri"
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
                    Edit Gambar Galeri
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom paragraph>
                    Perbarui gambar atau keterangannya.
                </Typography>

                <FileInputSupabase
                    source="image"
                    label="Ganti Gambar (Opsional)"
                    bucketName="images"
                    folderPath="gallery/"
                    validate={imageValidation} // Jadikan opsional
                    helperText="Pilih gambar baru (maks. 5MB) atau kosongkan jika ingin mempertahankan gambar saat ini."
                    sx={{ mb: 2 }}
                />
                <TextInput
                    source="caption"
                    label="Keterangan Gambar *"
                    multiline
                    rows={2}
                    fullWidth
                    validate={captionValidation}
                    helperText="Perbarui keterangan atau judul gambar ini (minimal 3 karakter)."
                    sx={{ mb: 2 }}
                />
            </Paper>
        </SimpleForm>
    </Edit>
);