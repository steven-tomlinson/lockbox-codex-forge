// Lockb0x Codex Entry Schema Validation
// Uses Ajv for JSON Schema validation
// Ajv is loaded as a global via <script> tag

export async function validateCodexEntry(entry) {
  const schemaUrl = '/schema/codex-entry.json';
  let schema;
  try {
    const res = await fetch(schemaUrl);
    schema = await res.json();
  } catch (err) {
    return { valid: false, errors: [{ message: 'Failed to load schema', details: err }] };
  }
  const ajv = new window.Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate(entry);
  return { valid, errors: validate.errors || [] };
}
