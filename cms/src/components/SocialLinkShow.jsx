import { Show, SimpleShowLayout, TextField, TopToolbar, EditButton, DeleteButton } from 'react-admin';
import { Card, CardContent, Typography, Box, Link } from '@mui/material';

const SocialLinkTitle = ({ record }) => {
    return <span>Tautan Sosial: {record ? `"${record.platform}"` : ''}</span>;
};

export const SocialLinkShow = props => (
    <Show 
        {...props} 
        title={<SocialLinkTitle />}
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
                {props.record?.platform}
            </Typography>
            <Link href={props.record?.url} target="_blank" sx={{ wordBreak: 'break-all', color: '#3b82f6' }}>
                {props.record?.url}
            </Link>
        </SimpleShowLayout>
    </Show>
);