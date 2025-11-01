import { Edit, SimpleForm, TextInput, required } from 'react-admin';
import { Box, Typography, Paper } from '@mui/material';
import { SmartFormToolbar } from './SmartFormToolbar';
import { smartValidation } from '../utils/notifications';

// Validasi untuk form
const keyValidation = [required(), smartValidation.minLength(2)];

const valueValidation = [required(), smartValidation.minLength(1)];

export const SettingEdit = props => (
    <Edit 
        {...props} 
        title={
            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#111827' }}>
                    Edit Pengaturan
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Edit pengaturan situs di bawah ini. Harap berhati-hati karena perubahan akan langsung terlihat di situs.
                </Typography>
            </Box>
        }
        sx={{ backgroundColor: 'transparent' }}
    >
        <Paper
            elevation={0}
            sx={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                p: 3,
            }}
        >
            <SimpleForm 
                toolbar={<SmartFormToolbar {...props} />}
                sx={{
                    '& .RaSimpleForm-input': {
                        mb: 2,
                        '& .MuiFormLabel-root': {
                            fontWeight: 'bold',
                            color: '#374151',
                            mb: 1,
                        },
                        '& .MuiInputBase-root': {
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            '&:hover': {
                                borderColor: '#4f46e5',
                            },
                            '&.Mui-focused': {
                                borderColor: '#4f46e5',
                                boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
                            },
                        },
                        '& .MuiFormHelperText-root': {
                            color: '#6b7280',
                            fontSize: '0.75rem',
                            mt: 0.5,
                        },
                    },
                }}
            >
                <TextInput 
                    source="key" 
                    label="Kunci Pengaturan *"
                    validate={keyValidation}
                    fullWidth 
                    helperText="Kunci unik untuk pengaturan ini (minimal 2 karakter). Wajib diisi."
                />
                <TextInput 
                    source="value" 
                    label="Nilai Pengaturan *"
                    validate={valueValidation}
                    multiline
                    rows={4}
                    fullWidth 
                    helperText="Nilai baru untuk pengaturan (minimal 1 karakter). Wajib diisi."
                />
                <TextInput 
                    source="description" 
                    label="Deskripsi"
                    multiline
                    rows={2}
                    fullWidth 
                    helperText="Penjelasan singkat tentang pengaturan ini (opsional)."
                />
            </SimpleForm>
        </Paper>
    </Edit>
);