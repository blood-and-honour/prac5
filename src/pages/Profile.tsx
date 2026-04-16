import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Avatar, Paper, Container, Box, Button, TextField } from '@mui/material';

const Profile = () => {
  const [name, setName] = useState('Артём Шаула');
  const [email, setEmail] = useState('artem_s@example.com');
  const formRef = useRef<HTMLDivElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const isHovering = useRef(false);
  const isAnimating = useRef(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1)' });
    }
  }, []);

  const applyHover = () => {
    if (saveButtonRef.current && !isAnimating.current) {
      gsap.to(saveButtonRef.current, { scale: 1.05, duration: 0.2, overwrite: true });
    }
  };
  const removeHover = () => {
    if (saveButtonRef.current && !isAnimating.current) {
      gsap.to(saveButtonRef.current, { scale: 1, duration: 0.2, overwrite: true });
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
    if (!saveButtonRef.current) return;
    isAnimating.current = true;
    gsap.killTweensOf(saveButtonRef.current);
    gsap.to(saveButtonRef.current, {
      scale: 1.05,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        isAnimating.current = false;
        const finalScale = isHovering.current ? 1.05 : 1;
        gsap.set(saveButtonRef.current, { scale: finalScale });
      }
    });
    const btn = saveButtonRef.current;
    btn.style.backgroundColor = '#ffcc00';
    setTimeout(() => {
      if (btn) btn.style.backgroundColor = '';
    }, 300);
    setToastMessage('Данные сохранены!');
    setTimeout(() => setToastMessage(null), 2000);
    console.log('Сохранено:', { name, email });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, pb: 0.7 }} ref={formRef}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>А</Avatar>
          <Typography variant="h5">Артём Шаула</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>artem_s@example.com</Typography>
          <Box sx={{ width: '100%', mt: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>Редактирование профиля</Typography>
            <TextField label="Имя" variant="outlined" fullWidth sx={{ mb: 3 }} value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Email" variant="outlined" fullWidth sx={{ mb: 3 }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button
              ref={saveButtonRef}
              variant="contained"
              color="primary"
              fullWidth
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              Сохранить изменения
            </Button>
          </Box>
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
export default Profile;