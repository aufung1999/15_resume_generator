export default function shortenUUID(input: string) {
  // remove decoration
  input = input.replace(/-/g, "");

  let base64String = Buffer.from(input, "hex").toString("base64");

  return base64String;
}
