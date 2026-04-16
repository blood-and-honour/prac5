import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Typography, Grid, Card, CardContent, CardActions, Button, Container } from '@mui/material';

const Products = () => {
  const products = [
    { name: 'Услуга 1', description: 'Описание услуги 1', price: '1000₽' },
    { name: 'Услуга 2', description: 'Описание услуги 2', price: '2000₽' },
    { name: 'Услуга 3', description: 'Описание услуги 3', price: '3000₽' },
  ];
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, idx) => {
      if (card) {
        gsap.fromTo(card, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, delay: idx * 0.1 });
      }
    });
  }, []);

  const handleCardEnter = (idx: number) => {
    if (cardsRef.current[idx]) {
      gsap.to(cardsRef.current[idx], {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleCardLeave = (idx: number) => {
    if (cardsRef.current[idx]) {
      gsap.to(cardsRef.current[idx], {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 5 }}>
        Наши услуги
      </Typography>

      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {products.map((product, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <div
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onMouseEnter={() => handleCardEnter(index)}
              onMouseLeave={() => handleCardLeave(index)}
            >
              <Card sx={{ height: '100%', textAlign: 'center', p: 1 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button size="small" color="primary">
                    Подробнее
                  </Button>
                </CardActions>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;