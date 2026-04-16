import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Grid, Typography, Card, CardContent, Button, Box, TextField } from '@mui/material';

const Home = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonSubscribeRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const isHoveringSubscribe = useRef(false);
  const isAnimatingSubscribe = useRef(false);
  const [showHistory, setShowHistory] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // GSAP анимация заголовков и карточек
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8 });
    }
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    }
    cardsRef.current.forEach((card, idx) => {
      if (card) {
        gsap.fromTo(card, { opacity: 0, y: 40, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.5, delay: idx * 0.1, ease: 'back.out(1)'
        });
      }
    });
  }, []);

  // Hover на карточки
  const handleCardEnter = (idx: number) => {
    if (cardsRef.current[idx]) {
      gsap.to(cardsRef.current[idx], { y: -8, scale: 1.02, duration: 0.3, ease: 'power2.out' });
    }
  };
  const handleCardLeave = (idx: number) => {
    if (cardsRef.current[idx]) {
      gsap.to(cardsRef.current[idx], { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  // Hover на кнопку подписки (GSAP)
  const applySubscribeHover = () => {
    if (buttonSubscribeRef.current && !isAnimatingSubscribe.current) {
      gsap.to(buttonSubscribeRef.current, { scale: 1.05, duration: 0.2, overwrite: true });
    }
  };
  const removeSubscribeHover = () => {
    if (buttonSubscribeRef.current && !isAnimatingSubscribe.current) {
      gsap.to(buttonSubscribeRef.current, { scale: 1, duration: 0.2, overwrite: true });
    }
  };
  const handleSubscribeEnter = () => {
    isHoveringSubscribe.current = true;
    applySubscribeHover();
  };
  const handleSubscribeLeave = () => {
    isHoveringSubscribe.current = false;
    removeSubscribeHover();
  };

  // Клик по кнопке подписки
  const handleSubscribeClick = () => {
    if (!buttonSubscribeRef.current) return;
    isAnimatingSubscribe.current = true;
    gsap.killTweensOf(buttonSubscribeRef.current);
    gsap.to(buttonSubscribeRef.current, {
      scale: 1.05,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        isAnimatingSubscribe.current = false;
        const finalScale = isHoveringSubscribe.current ? 1.05 : 1;
        gsap.set(buttonSubscribeRef.current, { scale: finalScale });
      }
    });
    // Мигание цвета
    const btn = buttonSubscribeRef.current;
    btn.style.backgroundColor = '#ffcc00';
    setTimeout(() => {
      if (btn) btn.style.backgroundColor = '';
    }, 300);
    setToastMessage('Вы успешно подписались!');
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography ref={titleRef} variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Добро пожаловать!
      </Typography>
      <Typography ref={subtitleRef} variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 6 }}>
        Ваш надёжный партнёр в мире интеллектуальных интерфейсов
      </Typography>

      {/* Карточки */}
      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {['Почему мы?', 'Наши преимущества', 'Акция!'].map((title, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
            <div
              ref={(el) => { cardsRef.current[idx] = el; }}
              onMouseEnter={() => handleCardEnter(idx)}
              onMouseLeave={() => handleCardLeave(idx)}
              style={{ display: 'flex', height: '100%' }}
            >
              <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', p: 1, cursor: 'pointer' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h5" gutterBottom>{title}</Typography>
                  <Typography>
                    {idx === 0 && '⌬ Современные технологии, индивидуальный подход, высокое качество.'}
                    {idx === 1 && '𖹭 Быстро, надёжно, с заботой о клиенте.'}
                    {idx === 2 && '☘︎ Скидка 20% на первый заказ.'}
                  </Typography>
                  {idx === 2 && <Button size="small" color="primary" sx={{ mt: 2 }}>Узнать больше</Button>}
                </CardContent>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Форма подписки (статичная) */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Подпишитесь на новости! ⌯⌲</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          <TextField label="Ваш email" variant="outlined" size="small" />
          <Button
            ref={buttonSubscribeRef}
            variant="contained"
            onMouseEnter={handleSubscribeEnter}
            onMouseLeave={handleSubscribeLeave}
            onClick={handleSubscribeClick}
          >
            Подписаться
          </Button>
        </Box>
      </Box>

      {/* Контейнер для уведомления (фиксированная высота, чтобы не прыгало) */}
      <Box sx={{ height: '40px', textAlign: 'center', mt: 1.5 }}>
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

      {/* Кнопка истории (появление с задержкой, размер как у кнопки подписки, скруглённые углы) */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: 'backOut' }}
        >
          <Button
            variant="contained"
            onClick={() => setShowHistory(!showHistory)}
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              fontSize: '0.875rem',    // такой же размер шрифта, как у стандартной кнопки MUI
              padding: '6px 16px',      // стандартные отступы MUI
              borderRadius: '20px',     // более скруглённые углы
              '&:hover': {
                backgroundColor: '#1565c0',
                transform: 'scale(1.02)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
              transition: 'background-color 0.2s, transform 0.1s'
            }}
          >
            {showHistory ? 'Скрыть историю' : '📜 Узнать историю компании'}
          </Button>
        </motion.div>

        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRadius: '16px',
                marginTop: '20px',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <Typography variant="h6" gutterBottom>────────ᛝ Наша история ᛝ────────</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Компания была основана в 2021 году группой энтузиастов, увлечённых созданием удобных и красивых интерфейсов.
              </Typography>
              <Typography variant="body2">
                За 5 лет мы выросли из небольшой команды в признанного лидера в области интеллектуальных интерфейсов, а наши решения используют тысячи пользователей по всему миру.
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Container>
  );
};

export default Home;