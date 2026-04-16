import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Typography, Paper, Container, List, ListItem, ListItemText } from '@mui/material';

const About = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }} ref={contentRef}>
        <Typography variant="h4" gutterBottom>О компании</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Мы — инновационная компания, специализирующаяся на разработке интеллектуальных интерфейсов.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Наша миссия — сделать технологии доступными и понятными каждому.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Наши ценности:</Typography>
        <List>
          <ListItem disablePadding><ListItemText primary="★ Инновации" /></ListItem>
          <ListItem disablePadding><ListItemText primary="★ Качество" /></ListItem>
          <ListItem disablePadding><ListItemText primary="★ Клиентоориентированность" /></ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default About;