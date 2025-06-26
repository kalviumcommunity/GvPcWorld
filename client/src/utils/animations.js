import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animation utility functions with performance optimizations
export const createHeroAnimation = (elements) => {
  if (!elements || elements.length === 0) return null;

  return gsap.fromTo(
    elements,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    }
  );
};

export const createScrollAnimation = (elements, trigger, options = {}) => {
  if (!elements || !trigger) return null;

  const defaultOptions = {
    y: [50, 0],
    opacity: [0, 1],
    duration: 0.6,
    stagger: 0.1
  };

  const finalOptions = { ...defaultOptions, ...options };

  return gsap.fromTo(
    elements,
    {
      y: finalOptions.y[0],
      opacity: finalOptions.opacity[0]
    },
    {
      y: finalOptions.y[1],
      opacity: finalOptions.opacity[1],
      duration: finalOptions.duration,
      stagger: finalOptions.stagger,
      scrollTrigger: {
        trigger,
        start: 'top center+=100',
        toggleActions: 'play none none none'
      }
    }
  );
};

// Helper function to clean up animations
export const cleanupAnimations = (animations = [], triggers = true) => {
  animations.forEach(anim => {
    if (anim && anim.kill) anim.kill();
  });

  if (triggers) {
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger && trigger.kill) trigger.kill();
    });
  }
};
