export const determineLevel = (progress) => {
    if (progress >= 80) return 'excellent';
    if (progress >= 60) return 'advanced';
    if (progress >= 30) return 'intermediate';
    return 'beginner';
  };  