// components/SmartFormToolbar.jsx
import { Toolbar, SaveButton, DeleteButton } from 'react-admin';
import { Button, Box } from '@mui/material';
import { useSmartNotification } from '../utils/notifications';
import { useRedirect } from 'react-admin';

export const SmartFormToolbar = (props) => {
    const { showInfo } = useSmartNotification();
    const redirect = useRedirect();
    
    const handleAutoSave = () => {
        showInfo('Form data saved automatically');
    };
    
    const handlePreview = () => {
        showInfo('Preview feature would open here');
    };
    
    const handleCancel = () => {
        // Redirect kembali ke halaman list
        redirect('list', `/${props.resource}`);
    };
    
    return (
        <Toolbar {...props} sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Box display="flex" gap={1}>
                <SaveButton />
                <Button 
                    variant="outlined" 
                    size="small"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
            </Box>
            <Box display="flex" gap={1}>
                <Button 
                    variant="outlined" 
                    size="small"
                    onClick={handlePreview}
                >
                    Preview
                </Button>
                <Button 
                    variant="outlined" 
                    size="small"
                    onClick={handleAutoSave}
                >
                    Auto Save
                </Button>
                <DeleteButton 
                    mutationMode="pessimistic" 
                    sx={{ 
                        backgroundColor: '#f87171', 
                        '&:hover': { backgroundColor: '#ef4444' } 
                    }} 
                />
            </Box>
        </Toolbar>
    );
};