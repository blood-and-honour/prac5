import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, TextField, Button, Paper, Container, Box } from '@mui/material';

const Contacts = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const isHovering = useRef(false);
  const isAnimating = useRef(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1)' });
    }
  }, []);

  const applyHover = () => {
    if (submitButtonRef.current && !isAnimating.current) {
      gsap.to(submitButtonRef.current, { scale: 1.05, duration: 0.2, overwrite: true });
    }
  };
  const removeHover = () => {
    if (submitButtonRef.current && !isAnimating.current) {
      gsap.to(submitButtonRef.current, { scale: 1, duration: 0.2, overwrite: true });
    }
  };

  const handleMouseEnter = () => {
    isHovering.current = true;
    applyHover();
  };
  const handleMouseLeave = () => {
    isHovering.current = false;
    removeHover();
  };

  const handleClick = () => {
    if (!submitButtonRef.current) return;
    isAnimating.current = true;
    gsap.killTweensOf(submitButtonRef.current);
    gsap.to(submitButtonRef.current, {
      scale: 1.05,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        isAnimating.current = false;
        const finalScale = isHovering.current ? 1.05 : 1;
        gsap.set(submitButtonRef.current, { scale: finalScale });
      }
    });
    const btn = submitButtonRef.current;
    btn.style.backgroundColor = '#ffcc00';
    setTimeout(() => {
      if (btn) btn.style.backgroundColor = '';
    }, 300);
    setToastMessage('Сообщение отправлено!');
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, pb: 0.7 }} ref={formRef}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Контакты</Typography>
        <Typography variant="body1" gutterBottom>✉︎ Email: company_info@example.ru</Typography>
        <Typography variant="body1" gutterBottom>☎︎ Телефон: +7 (985) 325-45-65</Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>🏠︎ Адрес: г. Санкт-Петербург, ул. Садовая, д. 10</Typography>
        <Typography variant="h6" gutterBottom>Напишите нам:</Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Ваше имя" variant="outlined" fullWidth />
          <TextField label="Email" variant="outlined" fullWidth />
          <TextField label="Сообщение" variant="outlined" multiline rows={4} fullWidth />
          <Button
            ref={submitButtonRef}
            variant="contained"
            color="primary"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            Отправить
          </Button>
        </Box>
        <Box sx={{ height: '40px', textAlign: 'center', mt: 2.5 }}>
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ color: '#555', fontSize: '1rem' }}
              >
                {toastMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Paper>
    </Container>
  );
};
export default Contacts;