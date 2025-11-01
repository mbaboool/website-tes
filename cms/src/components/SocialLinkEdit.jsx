import { Edit, SimpleForm, TextInput, required } from 'react-admin';
import { Box, Typography, Paper } from '@mui/material';
import { SmartFormToolbar } from './SmartFormToolbar';

// Validasi untuk form
const platformValidation = [required(), smartValidation.minLength(2)];

const urlValidation = [required(), (value) => {
    if (!value) return undefined;
    const urlPattern = /^https?:\/\/.+/
    if (!urlPattern.test(value)) {
        return 'Harus berupa URL valid yang diawali dengan http:// atau https://';
    }
    return undefined;
}];

export const SocialLinkEdit = props => (
    <Edit 
        {...props} 
        title={
            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#111827' }}>
                    Edit Tautan Sosial
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Edit informasi tautan media sosial Anda di bawah ini.
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
                    source="platform" 
                    label="Platform Sosial *"
                    validate={platformValidation}
                    fullWidth 
                    helperText="Nama platform sosial (misal: Instagram, Facebook) (minimal 2 karakter). Wajib diisi."
                />
                <TextInput 
                    source="url" 
                    label="Alamat URL *"
                    validate={urlValidation}
                    fullWidth 
                    helperText="URL lengkap yang diawali dengan http:// atau https://. Wajib diisi."
                />
            </SimpleForm>
        </Paper>
    </Edit>
);