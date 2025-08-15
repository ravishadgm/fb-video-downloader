export const formatNumber = (num) => {
  if (!num || num <= 0) return null;

  if (num >= 1_000_000) {
    const millions = num / 1_000_000;
    return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1)}M`;
  }

  return num.toLocaleString("en-US");
};
