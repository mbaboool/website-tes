import { Show, SimpleShowLayout, TextField, TopToolbar, EditButton, DeleteButton } from 'react-admin';
import { Card, CardContent, Typography, Box } from '@mui/material';

const TestimonialTitle = ({ record }) => {
    return <span>Testimoni: {record ? `"${record.name}"` : ''}</span>;
};

export const TestimonialShow = props => (
    <Show 
        {...props} 
        title={<TestimonialTitle />}
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
                Testimoni dari {props.record?.name}
            </Typography>
            <Typography variant="h6" sx={{ color: '#6b7280', fontStyle: 'italic' }}>
                {props.record?.company}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6, fontSize: '1.1rem', fontStyle: 'italic', color: '#4b5563' }}>
                "{props.record?.testimonial}"
            </Typography>
            {props.record?.image && (
                <Box sx={{ width: '100%', textAlign: 'center', my: 2 }}>
                    <img 
                        src={props.record.image} 
                        alt={props.record.name} 
                        style={{ maxWidth: '100px', height: '100px', borderRadius: '50%', border: '3px solid #e0e0e0', objectFit: 'cover' }} 
                    />
                </Box>
            )}
        </SimpleShowLayout>
    </Show>
);