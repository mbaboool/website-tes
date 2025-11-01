import React from 'react';
import { Create, SimpleForm, TextInput, DateInput, required } from 'react-admin';
import { Box, Typography, Paper } from '@mui/material';
import { SmartFormToolbar } from './SmartFormToolbar'; // Sesuaikan path jika berbeda
import FileInputSupabase from './FileInputSupabase'; // Pastikan path benar

// Definisikan validasi
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
const imageValidation = [required()]; // Asumsi gambar wajib
const dateValidation = [required()]; // Asumsi tanggal wajib

export const EventCreate = (props) => (
    <Create
        {...props}
        title="Tambah Acara Baru"
    >
        <SimpleForm
            toolbar={<SmartFormToolbar {...props} />}
            sx={{
                maxWidth: '800px', // Batasi lebar maksimum
                mx: 'auto', // Pusatkan secara horizontal
                px: 2, // Padding horizontal
                pb: 3, // Padding bawah
            }}
        >
            <Paper
                sx={{
                    p: 3, // Padding dalam paper
                    mb: 3, // Margin bawah paper
                    borderRadius: '16px', // Sudut membulat
                    backgroundColor: '#f8fafc', // Latar belakang terang
                    border: '1px solid #e2e8f0' // Border halus
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#0f172a' }}>
                    Detail Acara
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom paragraph>
                    Lengkapi informasi acara di bawah ini.
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
                    label="Tanggal Acara *"
                    fullWidth
                    validate={dateValidation}
                    helperText="Pilih tanggal pelaksanaan acara."
                    sx={{ mb: 2 }}
                />
                <FileInputSupabase
                    source="image"
                    label="Gambar Acara *"
                    bucketName="images" // Ganti dengan bucket yang sesuai
                    folderPath="events/"
                    validate={imageValidation}
                    helperText="Unggah gambar utama untuk acara ini (maks. 5MB). Format: JPG, PNG."
                    sx={{ mb: 2 }}
                    // Pastikan FileInputSupabase menangani validasi dan tipe file
                />
            </Paper>
        </SimpleForm>
    </Create>
);