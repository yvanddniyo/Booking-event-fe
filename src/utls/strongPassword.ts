export const getPasswordStrength = (password: string): { strength: string; color: string } => {
  if (password.length === 0) return { strength: "", color: "" };
  if (password.length < 8) return { strength: "Weak", color: "text-red-400" };
  if (password.length < 12) return { strength: "Medium", color: "text-yellow-400" };
  return { strength: "Strong", color: "text-green-400" };
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};