/**
 * Copies text to the clipboard and calls a setter to track the copied key.
 * Resets the key after 1800ms so the UI can return to its default state.
 */
export function copyText(
  text: string,
  key: string,
  setCopiedKey: (key: string | null) => void
) {
  navigator.clipboard.writeText(text);
  setCopiedKey(key);
  setTimeout(() => setCopiedKey(null), 1800);
}
