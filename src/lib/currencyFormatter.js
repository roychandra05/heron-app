const rupiah = { style: "currency", currency: "IDR" };

export default function currencyFormatter(value) {
  return Intl.NumberFormat("id-ID", rupiah).format(value);
}
