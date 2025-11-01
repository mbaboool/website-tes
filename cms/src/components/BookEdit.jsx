import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';
import { Box, Typography, Paper } from '@mui/material';
import { SmartFormToolbar } from './SmartFormToolbar'; // Sesuaikan path jika berbeda
import { smartValidation } from '../utils/notifications'; // Sesuaikan path jika berbeda

// Definisikan validasi
const detailValidation = [required(), (value) => {
    if (value && value.length < 10) {
        return 'Detail permintaan harus memiliki setidaknya 10 karakter';
    }
    return undefined;
}];

export const BookEdit = (props) => (
    <Edit
        {...props}
        title="Edit Detail Permintaan Booking"
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
                    Detail Permintaan Booking
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom paragraph>
                    Edit detail permintaan booking dari pelanggan. Informasi pelanggan seperti nama, email, dan perusahaan tidak dapat diedit di sini.
                </Typography>

                <TextInput
                    source="detail_text"
                    label="Detail Permintaan *"
                    multiline
                    rows={6}
                    fullWidth
                    validate={detailValidation}
                    helperText="Jelaskan secara rinci permintaan pelanggan atau informasi tambahan yang ingin ditambahkan (minimal 10 karakter)."
                    sx={{ mb: 2 }}
                />
            </Paper>
        </SimpleForm>
    </Edit>
);