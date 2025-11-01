// components/FileInputSupabase.jsx
import React, { useState } from 'react';
import { useInput, useNotify } from 'react-admin';
import { Box, Typography, Button, LinearProgress, Alert, IconButton } from '@mui/material';
import { Delete as DeleteIcon, CloudUpload as UploadIcon } from '@mui/icons-material';
import { uploadFileToSupabase, deleteFileFromSupabase, getFileNameFromUrl } from '../utils/fileUpload';

const FileInputSupabase = ({ source, label, bucketName = 'images', folderPath = 'uploads/', ...props }) => {
  const { field, fieldState } = useInput({ source, ...props });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const notify = useNotify();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    
    try {
      // Upload ke Supabase
      const result = await uploadFileToSupabase(file, bucketName, folderPath);
      
      if (result.success) {
        field.onChange(result.url); // Simpan URL ke field
        notify('File berhasil diupload', { type: 'info' });
      } else {
        setError(result.error);
        notify(`Upload gagal: ${result.error}`, { type: 'error' });
      }
    } catch (err) {
      setError(err.message);
      notify(`Upload gagal: ${err.message}`, { type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!field.value) return;
    
    try {
      // Dapatkan nama file dari URL
      const fileName = getFileNameFromUrl(field.value);
      if (!fileName) {
        notify('Tidak bisa menghapus file, URL tidak valid', { type: 'error' });
        return;
      }

      // Hapus dari Supabase Storage
      const result = await deleteFileFromSupabase(fileName, bucketName);
      
      if (result.success) {
        field.onChange(''); // Kosongkan field
        notify('File berhasil dihapus', { type: 'info' });
      } else {
        notify(`Hapus gagal: ${result.error}`, { type: 'error' });
      }
    } catch (err) {
      notify(`Hapus gagal: ${err.message}`, { type: 'error' });
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        {label || source}
      </Typography>
      
      {field.value && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 1,
          p: 1,
          border: '1px solid #e0e0e0',
          borderRadius: '4px'
        }}>
          <Typography variant="body2" noWrap sx={{ flex: 1, mr: 1 }}>
            {getFileNameFromUrl(field.value) || 'File tidak dikenal'}
          </Typography>
          <IconButton 
            size="small" 
            color="error" 
            onClick={handleDelete}
            disabled={uploading}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ display: 'none' }}
          id={`file-input-${source}`}
        />
        <label htmlFor={`file-input-${source}`}>
          <Button 
            variant="contained" 
            component="span" 
            startIcon={<UploadIcon />}
            disabled={uploading}
            sx={{ textTransform: 'none' }}
          >
            {uploading ? 'Mengupload...' : 'Pilih File'}
          </Button>
        </label>
        
        {uploading && (
          <Box sx={{ width: '100%', maxWidth: 200 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
      
      {fieldState.error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {fieldState.error.message}
        </Alert>
      )}
    </Box>
  );
};

export default FileInputSupabase;