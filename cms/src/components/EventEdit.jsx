import React from 'react';
import { Edit, SimpleForm, TextInput, DateInput, BooleanInput, required } from 'react-admin';
import { Box, Typography, Paper } from '@mui/material';
import { SmartFormToolbar } from './SmartFormToolbar'; // Sesuaikan path jika berbeda
import FileInputSupabase from './FileInputSupabase'; // Pastikan path benar

// Definisikan validasi (sama seperti Create)
const titleValidation = [required(), (value) => {
    if (value && value.length < 3) {
        return 'Judul harus memiliki setidaknya 3 karakter';
    }
    return undefined;
}];
const descriptionValidation = [required(), (value) => {
    if (value && value.length < 10) {
        return 'Deskripsi harus memiliki setidaknya 10 karakter';
    }
    return undefined;
}];
const imageValidation = []; // Make image optional during edit
const dateValidation = [required()];

export const EventEdit = (props) => (
    <Edit
        {...props}
        title="Edit Acara"
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
                    Detail Acara
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom paragraph>
                    Perbarui informasi acara di bawah ini.
                </Typography>

                <TextInput
                    source="title"
                    label="Judul Acara *"
                    fullWidth
                    validate={titleValidation}
                    helperText="Masukkan judul acara yang menarik perhatian (misal: Workshop Pengembangan Web)"
                    sx={{ mb: 2 }}
                />
                <TextInput
                    source="description"
                    label="Deskripsi Singkat *"
                    multiline
                    rows={4}
                    fullWidth
                    validate={descriptionValidation}
                    helperText="Jelaskan secara singkat detail acara (minimal 10 karakter)."
                    sx={{ mb: 2 }}
                />
                <DateInput
                    source="date"
                    label="Tanggal Acara"
                    fullWidth
                    helperText="Pilih tanggal pelaksanaan acara. Kosongkan jika belum pasti."
                    sx={{ mb: 2 }}
                />
                <BooleanInput 
                    source="is_coming_soon" 
                    label="Tampilkan 'Segera Hadir' (Coming Soon)" 
                    helperText="Jika diaktifkan, akan menampilkan 'Segera Hadir' di website utama, mengabaikan tanggal."
                    sx={{ mb: 2 }}
                />
                <FileInputSupabase
                    source="image"
                    label="Gambar Acara *"
                    bucketName="images"
                    folderPath="events/"
                    validate={imageValidation} // Validasi ini mungkin perlu disesuaikan untuk edit (opsional jika tidak ingin ganti)
                    helperText="Unggah gambar baru untuk acara ini (maks. 5MB). Biarkan kosong jika tidak ingin mengganti."
                    sx={{ mb: 2 }}
                    // FileInputSupabase sebaiknya menangani preview gambar lama jika tidak ada yang baru diupload
                />
            </Paper>
        </SimpleForm>
    </Edit>
);