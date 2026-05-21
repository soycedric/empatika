export type CalculatorDensity = 'default' | 'compact';

export const isCompactDensity = (density?: CalculatorDensity) => density === 'compact';
