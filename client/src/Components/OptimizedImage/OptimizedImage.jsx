import React, { useState, useEffect, memo } from 'react';
import { Box, Skeleton } from '@mui/material';

const OptimizedImage = memo(({
  src,
  alt,
  width = '100%',
  height = '100%',
  objectFit = 'cover',
  className,
  loading = 'lazy',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setLoaded(true); 
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        ...props.sx
      }}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      )}
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            ...props.style
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.200',
            color: 'grey.600',
            fontSize: '0.875rem',
          }}
        >
          Image not available
        </Box>
      )}
    </Box>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.src === nextProps.src &&
    prevProps.alt === nextProps.alt &&
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
