
import { Show, SimpleShowLayout, TextField, TopToolbar, EditButton, DeleteButton } from 'react-admin';
import { Card, CardContent, Typography, Box } from '@mui/material';

const BookTitle = ({ record }) => {
    return <span>Pemesanan: {record ? `"${record.id}"` : ''}</span>;
};

export const BookShow = props => (
    <Show 
        {...props} 
        title={<BookTitle />}
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
                Detail Permintaan Booking
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6, color: '#4b5563' }}>
                {props.record?.detail_text}
            </Typography>
        </SimpleShowLayout>
    </Show>
);
