interface StaticPixPayloadData {
  key: string;
  merchantName: string;
  merchantCity: string;
  description?: string;
  transactionId?: string;
}

export function createStaticPixPayload({
  key,
  merchantName,
  merchantCity,
  description,
  transactionId = "***",
}: StaticPixPayloadData) {
  const merchantAccount = [
    field("00", "BR.GOV.BCB.PIX"),
    field("01", key.trim().toLowerCase()),
    description ? field("02", normalizeText(description, 25)) : "",
  ].join("");

  const additionalData = field("05", normalizeText(transactionId, 25));
  const payloadWithoutChecksum = [
    field("00", "01"),
    field("01", "11"),
    field("26", merchantAccount),
    field("52", "0000"),
    field("53", "986"),
    field("58", "BR"),
    field("59", normalizeText(merchantName, 25)),
    field("60", normalizeText(merchantCity, 15)),
    field("62", additionalData),
    "6304",
  ].join("");

  return `${payloadWithoutChecksum}${crc16(payloadWithoutChecksum)}`;
}

function field(id: string, value: string) {
  const length = new TextEncoder().encode(value).length;
  return `${id}${String(length).padStart(2, "0")}${value}`;
}

function normalizeText(value: string, maxLength: number) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 $%*+\-./:]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase()
    .slice(0, maxLength);
}

function crc16(value: string) {
  const bytes = new TextEncoder().encode(value);
  let crc = 0xffff;

  for (const byte of bytes) {
    crc ^= byte << 8;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x8000) !== 0 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}
