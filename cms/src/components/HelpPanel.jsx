// components/HelpPanel.jsx
import React, { useState } from 'react';
import { 
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    Typography, 
    Box, 
    List, 
    ListItem, 
    ListItemText,
    IconButton
} from '@mui/material';
import { Help as HelpIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const HelpPanel = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // Panduan berdasarkan halaman yang sedang aktif
    const currentPath = window.location.hash;
    let helpContent = {
        title: "General Help",
        content: [
            {
                question: "How to navigate the CMS?",
                answer: "Use the sidebar menu to navigate between different sections like Events, Gallery, Bookings, etc."
            },
            {
                question: "How to add new content?",
                answer: "Click the '+' or 'Create' button on any list page to add new content."
            },
            {
                question: "How to edit existing content?",
                answer: "Click on any item in the list to go to its edit page, or click the edit icon."
            }
        ]
    };

    // Ubah konten bantuan berdasarkan halaman
    if (currentPath.includes('#/events')) {
        helpContent = {
            title: "Events Management Help",
            content: [
                {
                    question: "What is an Event?",
                    answer: "An event represents a specific occurrence or activity that you want to showcase on your website."
                },
                {
                    question: "How to create an event?",
                    answer: "Click 'Create' button, fill in the title, description, date, and image URL, then save."
                },
                {
                    question: "What format should the image URL be?",
                    answer: "The image URL should be a direct link to an image file (JPEG, PNG, GIF, etc.)"
                }
            ]
        };
    } else if (currentPath.includes('#/gallery_items')) {
        helpContent = {
            title: "Gallery Management Help",
            content: [
                {
                    question: "What is a Gallery Item?",
                    answer: "A gallery item is an image with a caption that gets displayed in the gallery section of your website."
                },
                {
                    question: "How to add a gallery item?",
                    answer: "Click 'Create' button, enter a caption and the URL of the image, then save."
                },
                {
                    question: "What are the image requirements?",
                    answer: "Image URLs should point to publicly accessible images in common formats (JPG, PNG, GIF)."
                }
            ]
        };
    } else if (currentPath.includes('#/book_details')) {
        helpContent = {
            title: "Booking Details Help",
            content: [
                {
                    question: "What are Booking Details?",
                    answer: "Booking details contain information related to a specific booking or reservation."
                },
                {
                    question: "How to create booking details?",
                    answer: "Click 'Create' button and enter the detailed information for the booking."
                }
            ]
        };
    } else if (currentPath.includes('#/settings')) {
        helpContent = {
            title: "Site Settings Help",
            content: [
                {
                    question: "What are Site Settings?",
                    answer: "Site settings control various aspects of your website like contact information, business hours, etc."
                },
                {
                    question: "How to edit site settings?",
                    answer: "Click on a setting item to edit its value. Common settings include contact info, business hours, etc."
                }
            ]
        };
    } else if (currentPath.includes('#/social_links')) {
        helpContent = {
            title: "Social Links Help",
            content: [
                {
                    question: "What are Social Links?",
                    answer: "Social links are URLs to your social media profiles that are displayed on your website."
                },
                {
                    question: "How to add a social link?",
                    answer: "Click 'Create' button, enter the platform name and the full URL to your profile."
                }
            ]
        };
    } else if (currentPath.includes('#/testimonials')) {
        helpContent = {
            title: "Testimonials Help",
            content: [
                {
                    question: "What are Testimonials?",
                    answer: "Testimonials are quotes from customers or clients that showcase positive feedback about your business."
                },
                {
                    question: "How to add a testimonial?",
                    answer: "Click 'Create' button, fill in the person's name, company, testimonial text, and optionally their image URL."
                }
            ]
        };
    }

    return (
        <Box 
            sx={{ 
                position: 'fixed', 
                bottom: 20, 
                right: 20, 
                zIndex: 1000 
            }}
        >
            <Accordion 
                expanded={expanded === 'help-panel'}
                onChange={handleChange('help-panel')}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '12px !important',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    minWidth: '320px',
                    '&.Mui-expanded': {
                        margin: '0'
                    }
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                        backgroundColor: '#4361ee',
                        color: 'white',
                        borderRadius: '12px',
                        '&.Mui-expanded': {
                            borderRadius: '12px 12px 0 0'
                        }
                    }}
                >
                    <HelpIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">{helpContent.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {helpContent.content.map((item, index) => (
                            <ListItem key={index} alignItems="flex-start" sx={{ display: 'block' }}>
                                <ListItemText
                                    primary={
                                        <Typography 
                                            sx={{ 
                                                fontWeight: 'bold', 
                                                color: '#1f2937',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Box 
                                                component="span" 
                                                sx={{ 
                                                    display: 'inline-block', 
                                                    width: 8, 
                                                    height: 8, 
                                                    backgroundColor: '#4361ee', 
                                                    borderRadius: '50%', 
                                                    mr: 1 
                                                }} 
                                            />
                                            {item.question}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography 
                                            sx={{ 
                                                pl: 2, 
                                                color: '#6b7280',
                                                lineHeight: 1.5
                                            }}
                                        >
                                            {item.answer}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default HelpPanel;