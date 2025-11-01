import { Show, SimpleShowLayout, TextField, TopToolbar, EditButton, DeleteButton } from 'react-admin';
import { Card, CardContent, Typography, Box } from '@mui/material';

const SettingTitle = ({ record }) => {
    return <span>Pengaturan: {record ? `"${record.key}"` : ''}</span>;
};

export const SettingShow = props => (
    <Show 
        {...props} 
        title={<SettingTitle />}
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
                {props.record?.key}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6, color: '#4b5563' }}>
                {props.record?.value}
            </Typography>
            <TextField source="description" label="Deskripsi" />
        </SimpleShowLayout>
    </Show>
);