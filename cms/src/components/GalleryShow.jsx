
import { Show, SimpleShowLayout, TextField, TopToolbar, EditButton, DeleteButton } from 'react-admin';
import { Card, CardContent, Typography, Box } from '@mui/material';

const GalleryTitle = ({ record }) => {
    return <span>Galeri: {record ? `"${record.caption}"` : ''}</span>;
};

export const GalleryShow = props => (
    <Show 
        {...props} 
        title={<GalleryTitle />}
        actions={
            <TopToolbar>
                <EditButton />
                <DeleteButton mutationMode="pessimistic" />
            </TopToolbar>
        }
    >
        <SimpleShowLayout 
            sx={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
        >
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                {props.record?.caption}
            </Typography>
            {props.record?.image && (
                <Box sx={{ width: '100%', textAlign: 'center', my: 2 }}>
                    <img 
                        src={props.record.image} 
                        alt={props.record.caption} 
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #e0e0e0' }} 
                    />
                </Box>
            )}
        </SimpleShowLayout>
    </Show>
);
